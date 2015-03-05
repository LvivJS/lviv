var React = require('react');

var Menu = React.createClass({
  render: function() {
    return (
      <div className="menu-wrapper">
        <div id="toggleWrapper">
          <input type="checkbox" id="menuToggleBox" />
          <label htmlFor="menuToggleBox" id="menuToggle">
            <div className="menuToggle__stripe"></div>
            <div className="menuToggle__stripe"></div>
            <div className="menuToggle__stripe"></div>
          </label>
        </div>
        <nav id="menuItems">
            <a href="#overview" className="menu__item">Overview</a>
            <a href="#speakers" className="menu__item">Speakers</a>
            <a href="#shedule" className="menu__item">Shedule</a>
            <a href="#location" className="menu__item">Location</a>
            <a href="#registration" className="menu__item">Registration</a>
            <a href="#partners" className="menu__item">Partners</a>
        </nav>
        <div id="darkenScreen"></div>
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
  var label = document.getElementById('menuToggle');
  var checkBox =  document.getElementById('menuToggleBox');
  var menu = document.getElementById('menuItems');
  var menuWidth = menu.offsetWidth;
  var menuItems = document.getElementsByClassName('menu__item');
  var menuButtonStripes = document.getElementsByClassName('menuToggle__stripe');
  var darkenScreen = document.getElementById('darkenScreen');

  //label events
  function setStripeMargin() {
    menuButtonStripes[1].style.marginTop = '4.5px';
    menuButtonStripes[1].style.marginBottom = '4.5px';
  }

  function nullStripeMargin() {
    menuButtonStripes[1].style.marginTop = '0px';
    menuButtonStripes[1].style.marginBottom = '0px';
  }
  //make stripes on label closer together
  label.onmouseout = nullStripeMargin;

  //make stripes on label further apart
  label.onmouseover = setStripeMargin;

  var toggleDisplay = function(v) {
    for (i = 0; i < menuItems.length; i++) {
      menu.style.left = v;
      //let on click on item togle visibility of menu
      menuItems[i].onclick = function() {
        toggle();
        checkBox.checked = false;
        nullStripeMargin();
      };
    }
  };

  function toggle() {
    if (!checkBox.checked) {
      toggleDisplay(0 + 'px');
      setStripeMargin('4.5px');
      label.onmouseout = setStripeMargin;
      //add darken effect to screen
      app.appendChild(darkenScreen);
      darkenScreen.style.opacity = '1';
      darkenScreen.style.zIndex = '1';
    } else {
      toggleDisplay('-' + menuWidth + 'px');
      label.onmouseout = nullStripeMargin;
      darkenScreen.style.opacity = '0';
      setTimeout(function() {
        darkenScreen.style.zIndex = '-1';
      }, 300);
    }
  }

  label.onclick = function() {
    toggle();
  }
};

module.exports = Menu;
