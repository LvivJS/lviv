'use strict';
var React = require('react');
var utilities = require('../utilities');
var config = require('../config');

var LocationMap = React.createClass({
  componentWillMount: function() {
    google.maps.event.addDomListener(window, 'load', this.initialize);
    utilities.ajax('get', config.pathJSON('location'), function(data) {
      var temp = JSON.parse(data);
      this.setState({
        header: temp.title,
        linkTitle: temp.linkTitle
      });
    }.bind(this));
  },
  initialize: function() {
    var myLatlng = new google.maps.LatLng(49.842721, 24.000630);
    var mapProp = {
      center: myLatlng,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false,
      draggable: false
    };
    var map = new google.maps.Map(document.getElementById('googleMap'), mapProp);
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Awesome place for conference! See you there!'
    });
    //creating custom control - link to maps website
    var controlDiv = document.createElement('div');
    controlDiv.className = 'location__control'
    var controlText = document.createElement('a');
    controlText.className = 'location__controlText';
    controlText.href = 'http://maps.google.com/maps?&z=' + mapProp.zoom + '&q=' + myLatlng.k + ',' + myLatlng.D;
    controlText.target = 'blank';
    controlText.innerHTML = this.state.linkTitle;
    controlDiv.appendChild(controlText);
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);
  },
  getInitialState: function() {
    return ({
      header: '',
      linkTitle: ''
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

module.exports = LocationMap;
