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
          <a href="#partners" className="menu__item">Partners</a>
      </nav>
    );
  }
});

window.addEventListener('scroll', function() {
  var menu = document.getElementById('menu');
  var header = document.getElementById('header');
  var overview = document.getElementById('overview');
  var pageScroll = window.pageYOffset;
  var menuStyle = menu.style;

  if (pageScroll > header.offsetHeight && pageScroll < header.offsetHeight + menu.offsetHeight) {
    menuStyle.position = 'fixed';
    menuStyle.width = '100%';
    menuStyle.top = '0';
    menuStyle.zIndex = '1';

    overview.offsetTop = header.offsetHeight + (pageScroll + menu.offsetHeight);
  } else if (pageScroll <= header.offsetHeight) {
    menuStyle.position = 'static';
  };
});

module.exports = Menu;
