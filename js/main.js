/*!
 * lviv-js v2020.0.2
 * LvivJS Conference website
 * (c) 2021
 * https://github.com/LvivJS/web_site
 */

/* eslint-disable */
// GOOGLE MAPS
var map;
function initMap() {
  const confLocation = new google.maps.LatLng(49.8515672, 24.0516607);

  map = new google.maps.Map(document.getElementById("map"), {
    center: confLocation,
    zoom: 15,
    mapTypeControl: false
  });

  var cityCircle = new google.maps.Circle({
    map: map,
    center: confLocation,
    radius: 100,
    strokeColor: "#fdc834",
    strokeOpacity: 1,
    strokeWeight: 1,
    fillColor: "#fdc834",
    fillOpacity: 0.25,
    clickable: false
  });
}
