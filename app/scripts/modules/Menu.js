var React = require('react');

var Menu = React.createClass({
  render: function() {
    return (
      <div className="menu-wrapper">
        <div id="cm_toggleWrapper" className="toggleWrapper">
          <input type="checkbox" id="cm_menuToggleBox" className="menuToggleBox" />
          <label htmlFor="cm_menuToggleBox" id="cm_menuToggle" className="menuToggle">
            <div className="menuToggle__stripe"></div>
            <div className="menuToggle__stripe"></div>
            <div className="menuToggle__stripe"></div>
          </label>
        </div>
        <nav id="cm_menuItems" className="menuItems">
            <a href="#overview" className="menu__item">Overview</a>
            <a href="#speakers" className="menu__item">Speakers</a>
            <a href="#shedule" className="menu__item">Shedule</a>
            <a href="#location" className="menu__item">Location</a>
            <a href="#registration" className="menu__item">Registration</a>
            <a href="#partners" className="menu__item">Partners</a>
        </nav>
        <div id="cm_darkenScreen" className="darkenScreen"></div>
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

//toggle label state and toggle menu visibility on sass bp(medium);
window.onload = function menuToggle() {
  var app = document.getElementById('app');
  var label = document.getElementById('cm_menuToggle');
  var checkBox =  document.getElementById('cm_menuToggleBox');
  var menu = document.getElementById('cm_menuItems');
  var menuWidth = menu.offsetWidth;
  var menuItems = document.getElementsByClassName('menu__item');
  var darkenScreen = document.getElementById('cm_darkenScreen');

  var toggleDisplay = function(v) {
    menu.style.left = v;
    for (i = 0; i < menuItems.length; i++) {
      //let on click on menu item togle visibility of menu
      menuItems[i].onclick = function() {
        toggle();
        checkBox.checked = false;
      };
    }
  };

  var toggleDarkenScreen = function(o, v) {
    darkenScreen.style.opacity = o;
    darkenScreen.style.visibility = v;
  };

  function toggle() {
    if (!checkBox.checked) {
      toggleDisplay(0 + 'px');
      //add darken effect to screen
      toggleDarkenScreen('1', 'visible');
    } else {
      toggleDisplay('-' + menuWidth + 'px');
      toggleDarkenScreen('0', 'hidden');
    }
  }

  label.onclick = function() {
    toggle();
  }

  darkenScreen.onclick = function() {
    toggleDisplay('-' + menuWidth + 'px');
    toggleDarkenScreen('0', 'hidden');
    checkBox.checked = false;
  }
};

module.exports = Menu;
