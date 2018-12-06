(function() {
  "use strict";

  angular.module("googleMap").directive("googleMap", googleMap);

  function googleMap(Spot) {
    var directive = {
      link: link,
      restrict: "E",
      template: '<div id="maps"></div>',
      replace: true,
      scope: {
        sports: "<",
        favMarkers: "<",
        markerOnClick: "&"
      }
    };

    return directive;

    function link(scope, element, attrs) {
      let map, infoWindow, userPos;
      let markers = [];

      // map config
      const mapOptions = {
        center: new google.maps.LatLng(47.824905, 2.618787),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: true
      };

      // init map
      function initMap() {
        if (map === void 0) {
          map = new google.maps.Map(element[0], mapOptions);
        }
      }

      // center map
      function centerMap(pos) {
        map.setCenter(pos);
      }

      // Locate user and center map on him
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          userPos = {
            lng: pos.coords.longitude,
            lat: pos.coords.latitude
          };

          centerMap(userPos);
        });
      }

      // place a marker
      function setMarker(map, position, title, content, spot) {
        let marker;

        // change icon if spot in favorite list
        const icon =
          scope.favMarkers &&
          scope.favMarkers.filter(e => {
            return e._id === spot._id;
          }).length === 0
            ? "/assets/img/mapfiles/dot.png"
            : "assets/img/mapfiles/fav-dot.png";

        const markerOptions = {
          map: map,
          title: title,
          position: position,
          icon: icon
        };

        marker = new google.maps.Marker(markerOptions);
        markers.push(marker);

        // attach listener to the current marker
        google.maps.event.addListener(marker, "click", function() {
          // close infoWindow if open
          if (infoWindow !== void 0) {
            infoWindow.close();
          }

          // open new infoWindow
          const infoWindowOptions = {
            content: content
          };
          infoWindow = new google.maps.InfoWindow(infoWindowOptions);
          infoWindow.open(map, marker);

          // onClick handler passed from parent
          scope.markerOnClick({ spot: spot });
        });
      }

      // show map
      initMap();

      // fetch spots in bounds on map idle
      google.maps.event.addListener(map, "idle", function() {
        // Get map bounds
        const bounds = map.getBounds();
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();

        const body = {
          selectedHobbies: scope.sports.split(",")
        };

        // fetch
        Spot.getAllMarkersInBounds(
          {
            southwest: `${sw.lng()},${sw.lat()}`,
            northeast: `${ne.lng()},${ne.lat()}`
          },
          body
        ).$promise.then(data => {
          // clear markers
          angular.forEach(markers, (marker, key) => {
            marker.setMap(null);
          });
          markers = [];

          // set new markers
          angular.forEach(data, (val, key) => {
            const name = val.name;
            const content = `<div class="infoWindow-content"><h3>${
              val.name
            }</h3><h6>Ville : ${
              val.address ? val.address.locality : ""
            }</h6><p>Sport : ${val.hobby}</p></div>`;
            const lng = val.loc.coordinates[0];
            const lat = val.loc.coordinates[1];
            setMarker(
              map,
              new google.maps.LatLng(lat, lng),
              name,
              content,
              val
            );
          });
        });
      });
    }
  }
})();
