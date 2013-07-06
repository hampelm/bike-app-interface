$(function(){
  // Set up the map with a base layer
  var bingKey =  'Arc0Uekwc6xUCJJgDA6Kv__AL_rvEh4Hcpj4nkyUmGTIx-SxMd52PPmsqKbvI_ce'

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
  var pointLayer = L.marker(map.getCenter());
  map.addLayer(pointLayer);

  map.on('drag', function() {
    pointLayer.setLatLng(map.getCenter());
  });

  map.on('moveend', function() {
    pointLayer.setLatLng(map.getCenter());
  });

  // Handle button clicks
  $('.issue').on('click', function() {
    pointLayer.setLatLng(map.getCenter());
    console.log("Added a point at ", map.getCenter());

    $('.issue').removeClass('btn-success');
    $('#submit').removeClass('disabled');
    $(this).addClass('btn-success');
  });

  $('.address-search').on('click', function(event) {
    event.preventDefault();

    var address = $('#address').val();
    geocodeAddress(address, function(error, data){
      map.setView(data.coords, 17);
    });
  });


  var geocodeAddress = function(address, callback) {
    address = address + ' detroit, mi';
    var geocodeEndpoint = 'http://dev.virtualearth.net/REST/v1/Locations/' + address + '?o=json&key=' + bingKey + '&jsonp=?';

    $.ajax({
      url: geocodeEndpoint,
      dataType: 'json',
      success: function (data) {
        if (data.resourceSets.length > 0){
          var result = data.resourceSets[0].resources[0];
          callback(null, {
            addressLine: result.address.addressLine,
            coords: [result.point.coordinates[0], result.point.coordinates[1]]
          });
        } else {
          callback({
            type: 'GeocodingError',
            message: 'No geocoding results found'
          });
        }
      }
    });
  }


});
