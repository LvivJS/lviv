'use strict';
var React = require('react');
var utilities = require('../utilities');
var config = require('../config');
var files = require('../db_connector');
var classNames = require('classnames');

var LocationMap = React.createClass({
  componentDidMount: function() {
    google.maps.event.addDomListener(window, 'load', this.initialize);
    files.get('modules/location', function(data) {
      this.setState({
        header: data.title,
        linkTitle: data.linkTitle
      });
    }.bind(this));

    files.get('modules/overview',  function(data) {
      this.setState({
        location: data.location,
        region: data.region,
        address: data.address
      });
    }.bind(this));
  },
  initialize: function() {
    var myLatlng = new google.maps.LatLng(49.842721, 24.000630);
    var mapProp = {
      center: myLatlng,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
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
      href: '',
      location: '',
      region: '',
      address: '',
      isMin: false
    });
  },
  toggleInfo: function() {
    var viewport = document.documentElement.clientWidth;
    if (viewport > config.breakPoint) {
      this.setState({isMin: !this.state.isMin});
    }
  },
  render: function() {
    //creating custom control - link to maps website
    var controlDiv = React.createElement('div', {className: 'location__control'},
      React.createElement('a', {
        className: 'location__controlText',
        href: this.state.href,
        target: '_blank'
      }, this.state.linkTitle));
    var locText = this.state.location.split(',')[0] + ', ' + this.state.region +
    ', ' + this.state.location.split(' ')[1];

    var infoClass = classNames({
      'loc-info': true,
      'loc-info--min': this.state.isMin
    });

    return (
      <section id="locations" className="page-wrap loc-wrap">
        <div className={infoClass} onClick={this.toggleInfo}>
          <div className="loc-info__text">
            <h2 className="module-header">
              {this.state.header}
            </h2>
            <span>
              {this.state.address}
            </span>
            <span>
              {locText}
            </span>
          </div>
          <div className="loc-info__icon">
            <image />
          </div>
        </div>
        <div id="googleMap" className="location">
        </div>
        {controlDiv}
      </section>
    );
  }
});

module.exports = LocationMap;
