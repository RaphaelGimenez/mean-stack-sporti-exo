(function() {
  "use strict";

  angular.module("app").config(($locationProvider, $routeProvider) => {
    $locationProvider.html5Mode({ enabled: true });
    $routeProvider
      .when("/", {
        template: "<select-sports></select-sports>"
      })
      .when("/discover", {
        template: "<discover-spots></discover-spots>"
      })
      .otherwise({
        template: "not found"
      });
  });
})();
