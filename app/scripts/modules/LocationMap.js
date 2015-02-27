var React = require('react');

var LocationMap = React.createClass({
  render: function() {
    return (
      <div id="googleMap" className="location">
      </div>
    );
  }
});

//google map script
function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(49.50, 24.0),
    zoom: 9,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById('googleMap'), mapProp);

}

google.maps.event.addDomListener(window, 'load', initialize);

module.exports = LocationMap;
