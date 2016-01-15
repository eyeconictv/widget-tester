(function (window) {
  "use strict";

  var displayId = "",
    companyId = "",
    throttle = false,
    throttleDelay = 1000,
    lastEvent = "";

  function getEventParams(params, cb) {
    var json = null;

    // event is required.
    if (params.event) {
      json = params;

      if (json.file_url) {
        json.file_format = RiseVision.Common.LoggerUtils.getFileFormat(json.file_url);
      }

      json.company_id = companyId;
      json.display_id = displayId;

      cb(json);
    }
    else {
      cb(json);
    }
  }

  function isThrottled(event) {
    return throttle && (lastEvent === event);
  }

  if (typeof window.RiseVision === "undefined") {
    window.RiseVision = {};
  }

  if (typeof window.RiseVision.Common === "undefined") {
    window.RiseVision.Common = {};
  }

  if (typeof window.RiseVision.Common.Logger === "undefined") {
    window.RiseVision.Common.LoggerUtils = {};
    window.RiseVision.Common.Logger = {};
  }

  window.RiseVision.Common.LoggerUtils = {
    getInsertData: function (params) {},
    getFileFormat: function (url) {
      var hasParams = /[?#&]/,
        str;

      if (!url || typeof url !== "string") {
        return null;
      }

      str = url.substr(url.lastIndexOf(".") + 1);

      // don't include any params after the filename
      if (hasParams.test(str)) {
        str = str.substr(0 ,(str.indexOf("?") !== -1) ? str.indexOf("?") : str.length);

        str = str.substr(0, (str.indexOf("#") !== -1) ? str.indexOf("#") : str.length);

        str = str.substr(0, (str.indexOf("&") !== -1) ? str.indexOf("&") : str.length);
      }

      return str.toLowerCase();
    },
    logEvent: function (table, params) {
      getEventParams(params, function(json) {
        if (json !== null) {
          RiseVision.Common.Logger.log(table, json);
        }
      });
    },
    setIds: function(company, display) {
      companyId = company;
      displayId = display;
    }
  };

  window.RiseVision.Common.Logger = {
    log: function (tableName, params) {
      if (!tableName || !params || (params.hasOwnProperty("event") && !params.event) ||
        (params.hasOwnProperty("event") && isThrottled(params.event))) {
        return;
      }

      throttle = true;
      lastEvent = params.event;

      setTimeout(function () {
        throttle = false;
      }, throttleDelay);

      if (params.cb && typeof params.cb === "function") {
        params.cb(null);
      }
    }
  };

})(window);
