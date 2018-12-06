(function() {
  "use strict";

  angular.module("discoverSpots").component("discoverSpots", {
    templateUrl: "/app/discover-spots/discover-spots.template.html",
    controller: discoverSpotsController,
    controllerAs: "$ctrl"
  });

  function discoverSpotsController(List, $scope, $routeParams) {
    var $ctrl = this;

    /*
      Fetch lists from DB
      If id given, view will select this list
    */
    $ctrl.initLists = function(id) {
      List.getLists().$promise.then(res => {
        if (res.data.length > 0) {
          $ctrl.lists = res.data;
          $ctrl.selectedList = id ? id : $ctrl.lists[0]._id;
        } else {
          $ctrl.lists = undefined;
          $ctrl.spots = [];
        }
      });
    };

    $ctrl.createList = function() {
      if (!$ctrl.newListName) {
        return;
      }

      const body = {
        name: $ctrl.newListName
      };
      List.createList(body).$promise.then(res => {
        $ctrl.showAddListInput = false;
        $ctrl.initLists(res.data._id);
      });
    };

    $ctrl.deleteList = function() {
      List.deleteList({ listId: $ctrl.selectedList }).$promise.then(() => {
        $ctrl.initLists();
      });
    };

    $ctrl.addSpot = function(spotId, spotName) {
      const body = {
        name: spotName
      };
      List.addSpot(
        { listId: $ctrl.selectedList, spotId: spotId },
        body
      ).$promise.then(() => {
        $ctrl.showAddSpotItem = false;
        $ctrl.initLists($ctrl.selectedList);
      });
    };

    $ctrl.deleteSpot = function(spotId) {
      List.deleteSpot({
        listId: $ctrl.selectedList,
        spotId: spotId
      }).$promise.then(() => {
        $ctrl.initLists($ctrl.selectedList);
      });
    };

    $ctrl.showAddListInputHandler = function() {
      $ctrl.showAddListInput = !$ctrl.showAddListInput;
    };

    /*
      Highlight spot if in fav
      Else show add list item
    */
    $ctrl.markerOnClickHandler = function(spot) {
      $ctrl.selectedSpot.id = spot._id;
      $ctrl.selectedSpot.name = spot.name;

      if (
        $ctrl.spots.filter(e => {
          return e._id === spot._id;
        }).length !== 0
      ) {
        $ctrl.showAddSpotItem = false;

        $scope.$apply();
        return;
      }

      $ctrl.showAddSpotItem = true;
      $scope.$apply();
    };

    ////////////////

    $ctrl.$onInit = function() {
      $ctrl.sports = $routeParams.sports;

      // All lists in DB
      $ctrl.lists;
      // All spots of the selected list
      $ctrl.spots = [];

      // Selected spot
      $ctrl.selectedSpot = {
        id: "",
        name: ""
      };

      $ctrl.showAddListInput = false;
      $ctrl.showAddSpotItem = false;

      $ctrl.initLists();
    };
    $ctrl.$onChanges = function(changesObj) {};
    $ctrl.$doCheck = function() {
      // On list selection update fav spots
      if ($ctrl.lists) {
        $ctrl.spots = $ctrl.lists.filter(
          list => list._id === $ctrl.selectedList
        )[0].spots;
      }
    };
    $ctrl.$onDestroy = function() {};
  }
})();
