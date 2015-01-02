var i18n = {
  t: function(value) {
    return value;
  }
};

angular.module("risevision.widget.common", [])
  .service("i18nLoader", function () {
    this.get = function () {
      return { then: function(cb) { cb(); }};
    };
  });

angular.module('risevision.common.i18n', []);
