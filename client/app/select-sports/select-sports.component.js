(function() {
  "use strict";

  angular.module("selectSports").component("selectSports", {
    templateUrl: "/app/select-sports/select-sports.template.html",
    controller: selectSportsController,
    controllerAs: "$ctrl"
  });

  function selectSportsController($location) {
    var $ctrl = this;

    // Add / Remove sport from $ctrl.selectedSports array
    $ctrl.selectSportHandler = function(sport) {
      const index = $ctrl.selectedSports.indexOf(sport);
      if (index === -1) {
        $ctrl.selectedSports.push(sport);
      } else {
        $ctrl.selectedSports.splice(index, 1);
      }
    };

    // Check / UnCheck all sports
    $ctrl.selectAllHandler = function() {
      $ctrl.selectedSports =
        $ctrl.selectedSports.length === $ctrl.sports.length
          ? []
          : [...$ctrl.sports];
    };

    $ctrl.submitForm = function() {
      $location.url(`/discover?sports=${$ctrl.selectedSports.join(",")}`);
    };

    ////////////////

    $ctrl.$onInit = function() {
      $ctrl.sports = [
        "alpinisme",
        "apnee",
        "basketball",
        "bmx",
        "canoe-kayak",
        "cyclisme",
        "danse",
        "equitation",
        "escalade",
        "fitness",
        "football",
        "golf",
        "handball",
        "jetski",
        "kitesurf",
        "motocross",
        "musculation",
        "natation",
        "parachutisme",
        "parapente",
        "peche",
        "plongee",
        "quad",
        "rafting",
        "randonnee",
        "roller",
        "running-trail",
        "skateboard",
        "ski",
        "ski-de-fond",
        "ski-de-randonnee",
        "snowboard",
        "speleologie",
        "sport-de-combat",
        "squash",
        "stand-up-paddle",
        "surf",
        "tennis",
        "voile",
        "volleyball",
        "vtt",
        "wakeboard",
        "windsurf",
        "wingsuit",
        "yoga",
        "via-ferrata",
        "autre"
      ];
      $ctrl.selectedSports = [];
    };
    $ctrl.$onChanges = function() {};
    $ctrl.$onDestroy = function() {};
  }
})();
