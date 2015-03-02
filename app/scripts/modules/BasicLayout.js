'use strict';

var React = require('react');
var Header = require('./Header');
var Menu = require('./Menu');
var LocationMap = require('./LocationMap');
var Footer = require('./Footer');

var LayoutBasic = React.createClass({
  render: function() {
    return (
      <div className="page-wrap">
        <header id="header">
          <Header />
        </header>
        <div id="menu" className="module-wrapper">
          <Menu />
        </div>        
        <h1 id="overview">A name of conference</h1>
        <div className="module-wrapper">        
          <div className="container">
            here to be inserted overview module
          </div>
        </div>        
        <h2 id="speakers" className="module-header">Speakers</h2>
        <div className="module-wrapper">        
          <div className="container">
            here to be inserted speakers module
          </div>
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
        <footer className="module-wrapper">
          <Footer />
        </footer>
      </div>
    );
  }
});

module.exports = LayoutBasic;
