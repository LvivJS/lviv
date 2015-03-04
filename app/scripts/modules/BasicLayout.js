'use strict';

var React = require('react');
var Header = require('./Header');
var Menu = require('./Menu');
var LocationMap = require('./LocationMap');
var Speakers = require('./Speakers');
var Partners = require('./Partners');
var Schedule = require('./Schedule');

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
        <section id="overview" className="page-wrap">  
        <h1>A name of conference</h1>
          <div className="container">
            here to be inserted overview module
          </div>
        </section>        
        <section id="speakers" className="page-wrap">        
          <h2 className="module-header">Speakers</h2>
            <Speakers />
        </section>        
        <section id="shedule" className="page-wrap">        
          <h2 className="module-header">Shedule</h2>
          <Schedule /> 
        </section>        
        <section id="location" className="page-wrap">
        <h2 className="module-header">Location</h2>
          <LocationMap />
        </section>        
        <section id="registration" className="page-wrap">        
        <h2 className="module-header">Registration</h2>
          <div className="container">
            here to be inserted registration module
          </div>
        </section>        
        <section id="partners" className="page-wrap">
        <h2 className="module-header">Partners</h2>
          <Partners />
        </section>
        <footer id="footer" className="page-wrap">
          <div className="container">
            here to be inserted footer module
          </div>
        </footer>
      </div>
    );
  }
});

module.exports = LayoutBasic;
