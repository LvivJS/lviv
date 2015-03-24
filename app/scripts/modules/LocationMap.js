'use strict';
var React = require('react');
var utilities = require('../utilities');
var config = require('../config');

var LocationMap = React.createClass({
  componentWillMount: function() {
    google.maps.event.addDomListener(window, 'load', initialize);
    utilities.ajax('get', config.path.location, function(data) {
      var temp = JSON.parse(data);
      this.setState({
        header: temp.title
      });
    }.bind(this));
  },
  getInitialState: function() {
    return ({
      header: ''
    });
  },
  render: function() {
    return (
      <section id="location" className="page-wrap">
        <h2 className="module-header">{this.state.header}</h2>
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
    title: 'Awesome place for conference! See you there!',
    url: 'http://maps.google.com/maps?&z=' + mapProp.zoom + '&q=' + myLatlng.k + ',' + myLatlng.D
  });
  google.maps.event.addListener(marker, 'click', function() {
    window.open(marker.url, '_blank')
  });
}

module.exports = LocationMap;
