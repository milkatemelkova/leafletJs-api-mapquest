let map = L.map("map", {
  layers: MQ.mapLayer(),
  center: [35.791188, -78.636755],
  zoom: 12
});

function runDirection(beginning, end) {
  map = L.map("map", {
    layers: MQ.mapLayer(),
    center: [35.791188, -78.636755],
    zoom: 12
  });

  var dir = MQ.routing.directions();

  dir.route({
    locations: [beginning, end]
  });

  CustomRouteLayer = MQ.Routing.RouteLayer.extend({
    createbeginningMarker: location => {
      var custom_icon;
      var custom_icon1;
      var marker;

      custom_icon1 = L.icon({
        iconUrl: "img/starts.png",
        iconSize: [60, 39],
        iconAnchor: [10, 29],
        popupAnchor: [0, -29]
      });

      marker = L.marker(location.latLng, { icon: custom_icon1 }).addTo(map);

      return marker;
    },

    createEndMarker: location => {
      var custom_icon;
      var marker;

      custom_icon = L.icon({
        iconUrl: "img/fin.png",
        iconSize: [60, 39],
        iconAnchor: [10, 29],
        popupAnchor: [0, -29]
      });

      marker = L.marker(location.latLng, { icon: custom_icon }).addTo(map);

      return marker;
    }
  });

  map.addLayer(
    new CustomRouteLayer({
      directions: dir,
      fitBounds: true
    })
  );
}
var scale = L.control.scale();
scale.addTo(map);

function submitinputplace(event) {
  event.preventDefault();

  map.remove();

  beginning = document.getElementById("beginning").value;
  end = document.getElementById("final").value;

  runDirection(beginning, end);

  document.getElementById("inputplace").reset();
}

const inputplace = document.getElementById("inputplace");

inputplace.addEventListener("submit", submitinputplace);
