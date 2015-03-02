var React = require('react');

var Menu = React.createClass({
  render: function() {
    return (
      <nav className="menu">
          <a href="#overview" className="menu__item">Overview</a>
          <a href="#speakers" className="menu__item">Speakers</a>
          <a href="#shedule" className="menu__item">Shedule</a>
          <a href="#location" className="menu__item">Location</a>
          <a href="#registration" className="menu__item">Registration</a>
      </nav>
    );
  }
});

module.exports = Menu;
