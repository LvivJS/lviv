var React = require('react');

var LocationMap = React.createClass({
  componentWillMount: function() {
    google.maps.event.addDomListener(window, 'load', initialize);
  },
  render: function() {
    return (
      <section id="location" className="page-wrap">
        <h2 className="module-header">Location</h2>
        <div id="googleMap" className="location">
        </div>
      </section>
    );
  }
});

//google map script
function initialize() {
  var myLatlng = new google.maps.LatLng(49.842721, 24.000630);
  var mapProp = {
    center: myLatlng,
    zoom: 17,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false
  };
  var map = new google.maps.Map(document.getElementById('googleMap'), mapProp);
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: 'Awesome place for conference! See you there!'
  });
}

module.exports = LocationMap;
