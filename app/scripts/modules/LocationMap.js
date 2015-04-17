'use strict';
var React = require('react');
var utilities = require('../utilities');
var config = require('../config');
var files = require('../db_connector');

var LocationMap = React.createClass({
  componentWillMount: function() {
    google.maps.event.addDomListener(window, 'load', this.initialize);
    files.get('modules/location', function(data) {
      this.setState({
        header: data.title,
        linkTitle: data.linkTitle
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
    //this will be used from control div
    this.setState({href: 'http://maps.google.com/maps?&z=' + mapProp.zoom + '&q=' + myLatlng.k + ',' + myLatlng.D});
  },
  getInitialState: function() {
    return ({
      header: '',
      linkTitle: '',
      href: ''
    });
  },
  render: function() {
    //creating custom control - link to maps website
    var controlDiv = React.createElement('div', {className: 'location__control'},
      React.createElement('a', {
        className: 'location__controlText',
        href: this.state.href,
        target: '_blank'
      }, this.state.linkTitle));
    return (
      <section id="location" className="page-wrap loc-wrap">
        <h2 className="module-header">{this.state.header}</h2>
        <div id="googleMap" className="location">
        </div>
        {controlDiv}
      </section>
    );
  }
});

module.exports = LocationMap;
