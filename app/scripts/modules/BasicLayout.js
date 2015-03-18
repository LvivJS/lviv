
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

var LayoutBasic = React.createClass({
  render: function() {
    return (
      <div className="page-wrap">
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
