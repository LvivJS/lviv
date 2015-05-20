'use strict';

var React = require('react');
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
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;
var files = require('../db_connector');

var LayoutBasic = React.createClass({
  mixins: [IntlMixin],
  getInitialState: function() {
    return {
      overview: {}
    }
  },
  componentDidMount: function() {
    files.get('modules/overview',  function(data) {
      this.setState({overview: data});
    }.bind(this));
  },
  render: function() {
    var confModules = [];

    config.modules.forEach(function(item) {
      if (item.isRendering) {
        confModules.splice(item.order, 0, item.title);
      }
    });

    var moduleList = {
      locations: <LocationMap key="LocationMap" />,
      speakers: <Speakers key="Speakers" />,
      partners: <Partners key="Partners" />,
      schedule: <Schedule key="Schedule" />,
      registration: <Registration key="Registration" />,
      overview: <Overview key="Overview" />
    };

    var modulesToRender = confModules.map(function(item) {
      return moduleList[item.en];
    });

    return (
      <div className="page-wrap">
        <Menu items={confModules} title={this.state.overview.name}/>

        {modulesToRender}

        <Footer />
      </div>
    );
  }
});

module.exports = LayoutBasic;
