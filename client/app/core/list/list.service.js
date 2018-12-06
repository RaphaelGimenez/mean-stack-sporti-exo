(function() {
  "use strict";

  angular.module("core.list").factory("List", List);

  function List($resource, $location) {
    const url = "/api/lists";
    const services = {};

    services.getLists = {
      method: "GET"
    };

    services.getList = {
      method: "GET",
      url: `${url}/:listId`,
      params: { listId: "@listId" }
    };

    services.createList = {
      method: "POST"
    };

    services.deleteList = {
      method: "DELETE",
      url: `${url}/:listId`,
      params: { listId: "@listID" }
    };

    services.addSpot = {
      method: "PATCH",
      url: `${url}/:listId/spots/:spotId`,
      params: { listId: "@listId", spotId: "@spotId" }
    };

    services.deleteSpot = {
      method: "DELETE",
      url: `${url}/:listId/spots/:spotId`,
      params: { listId: "@listId", spotId: "@spotId" }
    };

    return $resource(url, {}, services);
  }
})();
