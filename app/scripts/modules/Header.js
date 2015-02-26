'use strict';

var React = require('react');

var Header = React.createClass({
  render: function() {
    return(
     <div id="header" className="header">
      <div id="logo" className="header__logo"><img src="./dev/images/logo.jpg"/></div>
      <div id="menu" className="menu">
       <ul>
        <li className="menu__item"><a href="#">Register</a></li>
        <li className="menu__item menu__item--active"><a href="#">Schedule</a></li>
        <li className="menu__item"><a href="#">Reporters</a></li>
        <li className="menu__item"><a href="#">Locating</a></li>
       </ul>
      </div>
     </div>
    );
  }
});

module.exports = Header;
