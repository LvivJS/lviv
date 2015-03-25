'use strict';

var React = require('react');
var config = require('../config');

var Header = React.createClass({
  render: function() {
    return (
      <header id="header">
        <div className="header">
          <div id="logo" className="header__logo"><img src={config.pathIMG.conf_logo}/></div>
        </div>
      </header>
    );
  }
});

module.exports = Header;
