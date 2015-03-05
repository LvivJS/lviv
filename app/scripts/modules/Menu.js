var React = require('react');

var Menu = React.createClass({
  render: function() {
    return (
      <nav className="menu">
          <div id="toggleWrapper">
            <input type="checkbox" id="menuToggleBox" />
            <label htmlFor="menuToggleBox" id="menuToggle">
              <div className="menuToggle__stripe"></div>
              <div className="menuToggle__stripe"></div>
              <div className="menuToggle__stripe"></div>
            </label>
          </div>
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
    menuStyle.zIndex = '1';
    overview.style.paddingTop = menu.offsetHeight + 'px';
  } else {
    menuStyle.position = 'static';
    overview.style.paddingTop = '0px';
  }
});

//toggle label state and toggle menu visibility on sass bp(medium);
window.onload = function menuToggle() {
  var label = document.getElementById('menuToggle');
  var checkBox =  document.getElementById('menuToggleBox');
  var menuItems = document.getElementsByClassName('menu__item');
  var menuButtonStripes = document.getElementsByClassName('menuToggle__stripe');
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
      menuItems[i].style.display = v;
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
      toggleDisplay('flex');
      setStripeMargin('4.5px');
      label.onmouseout = setStripeMargin;
    } else {
      toggleDisplay('none');
      label.onmouseout = nullStripeMargin;
    }
  }

  label.onclick = function() {
    toggle();
  }
};

module.exports = Menu;
