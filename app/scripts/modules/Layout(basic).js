'use strict';

var React = require('react');
var Header = require('./Header');
var Menu = require('./Menu');
var LocationMap = require('./LocationMap');
var Speakers = require('./Speakers');

var LayoutBasic = React.createClass({
  render: function() {
    return (
      <div className="page-wrap">
        <div id="header">

          <Header />

        </div>
        <div id="menu">

          <Menu />

        </div>
        <div id="overview">
          <div className="container">
            here to be inserted overview module
          </div>
        </div>
        <div id="speakers">
          <div className="container">
            <Speakers />
          </div>
        </div>
        <div id="shedule">
          <div className="container">
            here to be inserted shedule module
          </div>
        </div>
        <div id="location">

          <LocationMap />

        </div>
        <div id="registration">
          <div className="container">
            here to be inserted registration module
          </div>
        </div>
        <div id="footer">
          <div className="container">
            here to be inserted footer module
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LayoutBasic;
