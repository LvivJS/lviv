'use strict';

var React = require('react');
var Header = require('./Header');
var Menu = require('./Menu');
var LocationMap = require('./LocationMap');
var Partners = require('./Partners');

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
        <section className="page-wrap">        
        <h1 id="overview">A name of conference</h1>
          <div className="container">
            here to be inserted overview module
          </div>
        </section>        
        <section className="page-wrap">        
        <h2 id="speakers" className="module-header">Speakers</h2>
          <div className="container">
            here to be inserted speakers module
          </div>
        </section>        
        <section className="page-wrap">        
        <h2 id="shedule" className="module-header">Shedule</h2>
          <div className="container">
            here to be inserted shedule module
          </div>
        </section>        
        <section className="page-wrap">
        <h2 id="location" className="module-header">Location</h2>
          <LocationMap />
        </section>        
        <section className="page-wrap">        
        <h2 id="registration" className="module-header">Registration</h2>
          <div className="container">
            here to be inserted registration module
          </div>
        </section>        
        <section className="page-wrap">
        <h2 id="partners" className="module-header">Partners</h2>
          <Partners />
        </section>
        <footer className="page-wrap">
          <div className="container">
            here to be inserted footer module
          </div>
        </footer>
      </div>
    );
  }
});

module.exports = LayoutBasic;
