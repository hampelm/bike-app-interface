$(function(){
  // Set up the map with a base layer
  //
  var map = L.map('map').setView([42.42, -83.02 ], 13);
  baseLayer = L.tileLayer('http://a.tiles.mapbox.com/v3/matth.map-pzt2g69t/{z}/{x}/{y}.png');
  map.addLayer(baseLayer);

  // Icons
  var PlaceIcon = L.icon({
    className: 'PlaceIcon',
    iconUrl: 'img/plus-24.png',
    shadowUrl: 'img/plus-24.png',
    iconSize: new L.Point(25, 25),
    shadowSize: new L.Point(25, 25),
    iconAnchor: new L.Point(13, 13),
    popupAnchor: new L.Point(13, 13)
  });

  var CrosshairIcon = L.icon({
    className: 'CrosshairIcon',
    iconUrl: 'img/crosshair.png',
    shadowUrl: 'img/crosshair.png',
    iconSize: new L.Point(141, 141),
    shadowSize: new L.Point(141, 141),
    iconAnchor: new L.Point(71, 71),
    popupAnchor: new L.Point(71, 71)
  });


  // Add the corsshair to the map
  var crosshairLayer = L.marker([0,0], {icon: CrosshairIcon});
  crosshairLayer.setLatLng(map.getCenter());
  map.addLayer(crosshairLayer);
  // Move the crosshairs as the map moves
  map.on('move', function(e){
    crosshairLayer.setLatLng(map.getCenter());
  });


  // Handle button clicks
  var pointLayer = L.marker(map.getCenter(), {icon: PlaceIcon});
  $('.issue').on('click', function() {
    map.addLayer(pointLayer);
    pointLayer.setLatLng(map.getCenter());
    console.log("Added a point at ", map.getCenter());
  });

});
