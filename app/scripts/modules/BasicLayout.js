
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

var LayoutBasic = React.createClass({
  render: function() {
    return (
      <div className="page-wrap">
      </div>
    );
  }
});

module.exports = LayoutBasic;
