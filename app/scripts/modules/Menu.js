var React = require('react');

var Menu = React.createClass({
  getInitialState: function() {
    return {
      active: false
    };
  },

  toggleMenu: function() {
    return this.setState({active: !this.state.active});
  },

  render: function() {
    var menuCls = this.state.active ? 'menu menu--visible' : 'menu';
    var darkCls = this.state.active ? 'darkenScreen--hidden darkenScreen--visible' : 'darkenScreen--hidden';
    return (
      <div className="menu-wrapper">
        <div id="cm_toggleWrapper" className="toggleWrapper">
          <div id="cm_menuToggle" className="menuToggle" onClick={this.toggleMenu}>
            <div className="menuToggle__stripe"></div>
            <div className="menuToggle__stripe"></div>
            <div className="menuToggle__stripe"></div>
          </div>
        </div>
        <nav id="cm_menuItems" className={menuCls}>
            <a href="#overview" className="menu__item" onClick={this.toggleMenu}>Overview</a>
            <a href="#speakers" className="menu__item" onClick={this.toggleMenu}>Speakers</a>
            <a href="#shedule" className="menu__item" onClick={this.toggleMenu}>Shedule</a>
            <a href="#location" className="menu__item" onClick={this.toggleMenu}>Location</a>
            <a href="#registration" className="menu__item" onClick={this.toggleMenu}>Registration</a>
            <a href="#partners" className="menu__item" onClick={this.toggleMenu}>Partners</a>
        </nav>
        <div id="cm_darkenScreen" className={darkCls} onClick={this.toggleMenu}></div>
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

//smooth scroll to anchors
window.onload = function() {
  var menu = document.getElementById('cm_menuItems');
  var links = menu.querySelectorAll('.menu__item');

  for (var i = 0; i < links.length; i++) {
    links[i].onclick = function(e) {
      e.preventDefault();
      var hash = e.target.href.substr(e.target.href.indexOf('#') + 1);
      var anchor = document.getElementById(hash);
      scrollToAnchor(anchor, 1);
    };
  }

  //scrolling function
  function scrollToAnchor(el, speed) {
    var startScroll = window.pageYOffset;
    var targetScroll = el.offsetTop;
    var steps = 10;
    var step = (Math.abs(startScroll - targetScroll) / steps);

    console.log('difference: ' + Math.abs(startScroll - targetScroll));
    console.log('step by steps: ' + (step * steps));

    var scroll = window.setInterval(function() {
      var currentScroll = window.pageYOffset;
      var menuHeight = document.querySelector('.menu-wrapper').offsetHeight;

      if (currentScroll - (targetScroll - menuHeight) > 0) {
        window.scrollBy(0, -step);
      } else if (currentScroll - (targetScroll - menuHeight) < 0) {
        window.scrollBy(0, step);
      } else {
        window.clearInterval(scroll);
      }
      step /= 1.1;
    }, speed);
  }
};

module.exports = Menu;
