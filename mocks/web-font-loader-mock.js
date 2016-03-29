(function (window){
  "use strict";

  if (typeof window.WebFont === "undefined") {
    window.WebFont = {};
  }

  window.WebFont = {
    load: function(params) {
      if (params && params.fontinactive) {
        if (params.google && params.google.families && params.google.families.length > 0) {
          params.fontinactive(params.google.families[0]);
        }
      }

      if (params && params.active) {
        params.active();
      }
    }
  };
})(window);