(function (window) {
  "use strict";

  if (typeof window.sessionStorage === "undefined") {
    window.sessionStorage = {};
  }

  window.sessionStorageError = false;

  var _items = [];

  function _getItem(key) {
    var item = null;

    _items.some(function (value) {
      if (typeof value === "object" && value.hasOwnProperty("key")) {
        if (value.key === key) {
          item = value;
          return true;
        }
      } else {
        return false;
      }
    });

    return (item) ? item.data : null;
  }

  function _setItem(key, data) {
    var existingItem = _getItem(key);

    if (existingItem) {
      existingItem.data = data;
    } else {
      _items.push({
        key: key,
        data: data
      });
    }
  }

  function _removeItem(key) {
    var foundIndex = -1;

    _items.some(function (value, index) {
      if (typeof value === "object" && value.hasOwnProperty("key")) {
        if (value.key === key) {
          foundIndex = index;
          return true;
        }
      } else {
        return false;
      }
    });

    if (foundIndex !== -1) {
      _items.splice(foundIndex, 1);
    }
  }

  window.sessionStorage.setItem = function (key, data) {
    if (window.sessionStorageError) {
      throw "Failed to execute 'setItem' on 'Storage' for '" + key + "'";
    } else {
      _setItem(key, data);
    }
  };

  window.sessionStorage.getItem = function (key) {
    return _getItem(key);
  };

  window.sessionStorage.removeItem = function (key) {
    if (window.sessionStorageError) {
      throw "Failed to execute 'removeItem' on 'Storage' for '" + key + "'";
    } else {
      _removeItem(key);
    }
  };

})(window);
