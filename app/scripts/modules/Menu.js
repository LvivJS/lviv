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

module.exports = Menu;
