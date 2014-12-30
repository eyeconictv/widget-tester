var i18n = {
  t: function(value) {
    return value;
  }
};

angular.module("risevision.widget.common", ["risevision.widget.common.translate"]);

angular.module("risevision.widget.common.translate", [])
  .service("i18nLoader", function () {
    this.get = function () {
      return { then: function(cb) { cb(); }};
    };
  })
  // mock the translate filter
  .filter("translate", function () {
    return function (val) {
      return val;
    };
  });

angular.module('risevision.common.i18n.config', [])
  .constant('LOCALES_PREFIX',
    '/components/rv-common-i18n/dist/locales/translation_')
  .constant('LOCALES_SUFIX', '.json');
