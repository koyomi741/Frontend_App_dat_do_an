
const html_script = `

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>

    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
      integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
      crossorigin=""
    />

    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css"
    />
    <style>
      .leaflet-routing-container {
        display: none;
      }
    </style>
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn-geoweb.s3.amazonaws.com/esri-leaflet-geocoder/0.0.1-beta.5/esri-leaflet-geocoder.css"
    />
  </head>
  <body>
    <div id="map"></div>
    <div class="pointer"></div>

    <script
      src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
      integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
      crossorigin=""
    ></script>
    <script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"></script>
    <script src="https://cdn-geoweb.s3.amazonaws.com/esri-leaflet/0.0.1-beta.5/esri-leaflet.js"></script>
    <script src="https://cdn-geoweb.s3.amazonaws.com/esri-leaflet-geocoder/0.0.1-beta.5/esri-leaflet-geocoder.js"></script>

    <style>
      body,
      html {
        height: 100%;
        font-family: Arial;
      }
      #map {
        width: 100%;
        height: 100%;
        z-index: 100;
      }
      .pointer {
        position: absolute;
        top: 86px;
        left: 60px;
        z-index: 99999;
      }
      .leaflet-control-zoom{
        display: none;
      }
      .leaflet-touch .geocoder-control {
        width: 275px;
        height: 30px;
      } 
    </style>
  </body>
</html>

<script>
  var cities = L.layerGroup();
  
  var mbAttr =
    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
  var mbUrl =
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";

  var grayscale = L.tileLayer(mbUrl, {
    id: "mapbox/light-v9",
    tileSize: 512,
    zoomOffset: -1,
    attribution: mbAttr,
  });
  var streets = L.tileLayer(mbUrl, {
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    attribution: mbAttr,
  });
  var outdoors = L.tileLayer(mbUrl, {
    id: "mapbox/outdoors-v11",
    tileSize: 512,
    zoomOffset: -1,
    attribution: mbAttr,
  });
  var mylayers = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  });
  var googleStreets = L.tileLayer(
    "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
    {
      maxZoom: 20,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }
  );

  var map = L.map("map", {
    center: [20.980652089221405, 105.78784534954742],
    zoom: 14,
    // layers: [googleStreets, cities],
    layers: [ mylayers, cities],

  });

  var baseLayers = {
    Grayscale: grayscale,
    Streets: streets,
    Outdoors: outdoors,
    MyLayers: mylayers,
    "Google Streets": googleStreets,
  };

  var overlays = {
    Cities: cities,
  };

  var layerControl = L.control.layers(baseLayers, overlays).addTo(map);
  var searchControl = new L.esri.Controls.Geosearch().addTo(map);

var results = new L.LayerGroup().addTo(map);

searchControl.on('results', function (data) {
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng));
    }
});

//========================================================================
var restaurantIcon = L.icon({
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Google_Maps_icon_%282020%29.svg/536px-Google_Maps_icon_%282020%29.svg.png",
    iconSize: [30, 45], // size of the icon
});

function onMapClick(e) {
  console.log(myLocation);
  if(myLocation.getLatLng() != falseLocation) {
    if(Line){
      map.removeControl(Line);
    }
    Line = L.Routing.control({
      createMarker: function () {
        return null;
      }, 
      waypoints: [
          L.latLng(myLocation.getLatLng()),
          L.latLng(e.latlng)
      ]
    }).addTo(map);
  } 
}

//========================================================================
const falseLocation = [-20.97, -105.78];
var myLocation = L.marker(falseLocation).addTo(map);
var Line;
var restaurant1 = L.marker([20.980652089221405, 105.78784534954742], {icon : restaurantIcon}).addTo(map)
var restaurant2 = L.marker([20.98627158594226, 105.77985414326452], {icon : restaurantIcon}).addTo(map)
var restaurant3 = L.marker([20.980821867188, 105.79470802918], {icon : restaurantIcon}).addTo(map)
var restaurant4 = L.marker([20.98377332426428, 105.77257998776494], {icon : restaurantIcon}).addTo(map)
var restaurant5 = L.marker([20.976123926068514, 105.78047816215448], {icon : restaurantIcon}).addTo(map)
var restaurant6 = L.marker([20.966237970590903, 105.77164105193877], {icon : restaurantIcon}).addTo(map)
var restaurant7 = L.marker([20.977170216009277, 105.76278718815838], {icon : restaurantIcon}).addTo(map)
var restaurant8 = L.marker([20.958613861226976, 105.76829905934825], {icon : restaurantIcon}).addTo(map)
var restaurant9 = L.marker([20.97351645446136, 105.78996204024197], {icon : restaurantIcon}).addTo(map)
var restaurant10 = L.marker([20.964139538787183, 105.77362058989772], {icon : restaurantIcon}).addTo(map)
var restaurant11 = L.marker([20.96065143358064, 105.74406252379868], {icon : restaurantIcon}).addTo(map)
var restaurant12 = L.marker([20.958362508406225, 105.79007240522579], {icon : restaurantIcon}).addTo(map)
var restaurant13 = L.marker([20.944873157973024, 105.75488588656505], {icon : restaurantIcon}).addTo(map)
var restaurant14 = L.marker([20.938645906377293, 105.78379138756746], {icon : restaurantIcon}).addTo(map)
var restaurant15 = L.marker([20.91895196659644, 105.73707265454502], {icon : restaurantIcon}).addTo(map)
var restaurant16 = L.marker([20.93631459394256, 105.72627963345676], {icon : restaurantIcon}).addTo(map)
var restaurant17 = L.marker([20.98335728496149, 105.75658307279164], {icon : restaurantIcon}).addTo(map)

restaurant1.on('click', onMapClick);
restaurant2.on('click', onMapClick);
restaurant3.on('click', onMapClick);
restaurant4.on('click', onMapClick);
restaurant5.on('click', onMapClick);
restaurant6.on('click', onMapClick);
restaurant7.on('click', onMapClick);
restaurant8.on('click', onMapClick);
restaurant9.on('click', onMapClick);
restaurant10.on('click', onMapClick);
restaurant11.on('click', onMapClick);
restaurant12.on('click', onMapClick);
restaurant13.on('click', onMapClick);
restaurant14.on('click', onMapClick);
restaurant15.on('click', onMapClick);
restaurant16.on('click', onMapClick);
restaurant17.on('click', onMapClick);

</script>


`;

export default html_script;
