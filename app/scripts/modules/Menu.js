var React = require('react');

var Menu = React.createClass({
  render: function() {
    return (
      <div className="menu-wrapper">
        <div id="cm_toggleWrapper" className="toggleWrapper">
          <div id="cm_menuToggle" className="menuToggle">
            <div className="menuToggle__stripe"></div>
            <div className="menuToggle__stripe"></div>
            <div className="menuToggle__stripe"></div>
          </div>
        </div>
        <nav id="cm_menuItems" className="menu">
            <a href="#overview" className="menu__item">Overview</a>
            <a href="#speakers" className="menu__item">Speakers</a>
            <a href="#shedule" className="menu__item">Shedule</a>
            <a href="#location" className="menu__item">Location</a>
            <a href="#registration" className="menu__item">Registration</a>
            <a href="#partners" className="menu__item">Partners</a>
        </nav>
        <div id="cm_darkenScreen" className="darkenScreen--hidden"></div>
      </div>
    );
  }
});

//fix menu when scrolling os make static due to window.pageYOffset
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
    overview.style.paddingTop = menu.offsetHeight + 'px';
  } else {
    menuStyle.position = 'static';
    overview.style.paddingTop = '0px';
  }
});

//toggle menu visibility on sass bp(medium);
window.onload = function menuToggle() {
  var button = document.getElementById('cm_menuToggle');
  var menu = document.getElementById('cm_menuItems');
  var menuWidth = menu.offsetWidth;
  var menuItems = document.getElementsByClassName('menu__item');
  var darkenScreen = document.getElementById('cm_darkenScreen');

  var toggleClassName = function(element, addClass, resetClass) {
    var classCheck = element.className.indexOf(addClass) ;
    if (classCheck == -1) {
      element.className += addClass;
    } else {
      element.className = resetClass;
    }
  };

  var toggleDisplay = function() {
    toggleClassName(menu, ' menu--visible', 'menu');
    toggleClassName(darkenScreen, ' darkenScreen--visible', 'darkenScreen--hidden');
  };

  //let button toggle menu and dark screen
  button.onclick = function() {
    toggleDisplay();
  }

  //hide darken screen by clicking on it
  darkenScreen.onclick = function() {
    toggleDisplay();
  }

  //let on click on menu item togle visibility of menu
  for (i = 0; i < menuItems.length; i++) {
    menuItems[i].onclick = function() {
      toggleDisplay();
    };
  }
};

module.exports = Menu;
