(function() {
  "use strict";

  angular.module("core.spot").factory("Spot", Spot);

  function Spot($resource) {
    const url = "https://sportihome.com/api/spots";
    const service = {};

    service.getAllMarkersInBounds = {
      method: "POST",
      url: `${url}/getAllMarkersInBounds/:southwest/:northeast`,
      params: { southwest: "@southwest", northeast: "@northeast" },
      isArray: true
    };

    return $resource(url, {}, service);
  }
})();
