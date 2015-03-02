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
        <div id="menu" className="module-wrapper">
          <Menu />
        </div>        
        <h1 id="overview">A name of conferention</h1>
        <div className="module-wrapper">        
          <div className="container">
            here to be inserted overview module
          </div>
        </div>        
        <h2 id="speakers" className="module-header">Speakers</h2>
        <div className="module-wrapper">        
          <Speakers />
        </div>        
        <h2 id="shedule" className="module-header">Shedule</h2>
        <div className="module-wrapper">        
          <div className="container">
            here to be inserted shedule module
          </div>
        </div>        
        <h2 id="location" className="module-header">Location</h2>
        <div className="module-wrapper">
          <LocationMap />
        </div>        
        <h2 id="registration" className="module-header">Registration</h2>
        <div className="module-wrapper">        
          <div className="container">
            here to be inserted registration module
          </div>
        </div>        
        <h2 id="footer" className="module-header">Partners</h2>
        <div className="module-wrapper">
          <div className="container">
            here to be inserted footer module
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LayoutBasic;
