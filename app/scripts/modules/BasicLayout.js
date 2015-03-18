'use strict';

var React = require('react');
var Header = require('./Header');
var Menu = require('./Menu');
var LocationMap = require('./LocationMap');
var Speakers = require('./Speakers.jsx');
var Partners = require('./Partners.js');
var Schedule = require('./Schedule.jsx');
var Registration = require('./Registration.jsx');
var Overview = require('./Overview.jsx');
var Footer = require('./Footer.jsx');
var config = require('../config');
var utilities = require('../utilities');

var configModules = [];

config.modules.map(function(module) {
  if (module.isRendering) {
    configModules.splice(module.order, 0, module.title);
  }
});

var moduleList = {
  header: <Header />,
  menu: <Menu items={configModules}/>,
  location: <LocationMap />,
  speakers: <Speakers />,
  partners: <Partners />,
  schedule: <Schedule />,
  registration: <Registration />,
  overview: <Overview />,
  footer: <Footer />
};

var LayoutBasic = React.createClass({
  var modulesToRender = configModules.map(function(item) {
    return moduleList[item];
  });
  render: function() {
    return (
      <div className="page-wrap">
        {modulesToRender}
      </div>
    );
  }
});

module.exports = LayoutBasic;
