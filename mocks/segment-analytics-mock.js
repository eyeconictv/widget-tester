(function (angular) {

  "use strict";

  // This mock disables the segment.io tracking script by
  // resetting the API key
  angular.module("risevision.common.analytics")
    .value("SEGMENT_API_KEY", null);
})(angular);
