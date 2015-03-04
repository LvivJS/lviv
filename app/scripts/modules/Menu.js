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
  var manuHeight = menu.offsetHeight;
  var headerHeight = header.offsetHeight;

  if (pageScroll >= headerHeight) {
    menuStyle.position = 'fixed';
    menuStyle.width = '100%';
    menuStyle.top = '0';
    menuStyle.zIndex = '1';
    header.style.marginBottom = menu.offsetHeight + 'px';
  } else {
    menuStyle.position = 'static';
    header.style.marginBottom = '0px';
  }
});

module.exports = Menu;
