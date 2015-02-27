'use strict';

var React = require('react');

var Header = React.createClass({
  render: function() {
    return(
     <div className="header">
      <div id="logo" className="header__logo"><img src="./dev/images/logo.jpg"/></div>
      
     </div>
    );
  }
});

module.exports = Header;
