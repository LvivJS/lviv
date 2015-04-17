var React = require('react');
var classNames = require('classnames');
var config = require('../config');

var Menu = React.createClass({
  getInitialState: function() {
    return {
      active: false
    };
  },

  toggleMenu: function() {
    return this.setState({active: !this.state.active});
  },

  menuLinkHandler: function(e) {
    e.preventDefault();
    this.toggleMenu();

    var menuHeight = document.querySelector('.menu-wrapper').offsetHeight;
    var hash = e.target.href.substr(e.target.href.indexOf('#') + 1);
    var anchor = document.getElementById(hash);
    var targetY = anchor.offsetTop - menuHeight;

    scrollTo(targetY, 300);
  },

  render: function() {
    var menuCls = classNames({
      'menu--visible': this.state.active,
      'menu': true
    });
    var darkCls = classNames({
      'darkenScreen--hidden': true,
      'darkenScreen--visible': this.state.active
    });
    //choose locale from config
    var localePath = config.localePath;
    var loc = localePath.substr(localePath.lastIndexOf('/') + 1);

    var itemsToRender = this.props.items.map(function(item) {
      var href = '#' + item.en;
      return <a href={href} key={item.en} className="menu__item" onClick={this.menuLinkHandler}>{item[loc]}</a>;
    }.bind(this));

    return (
      <div id="menu" className="module-wrapper">
        <div className="menu-wrapper">
          <div id="cm_toggleWrapper" className="toggleWrapper">
            <div id="cm_menuToggle" className="menuToggle" onClick={this.toggleMenu}>
              <div className="menuToggle__stripe"></div>
              <div className="menuToggle__stripe"></div>
              <div className="menuToggle__stripe"></div>
            </div>
          </div>
          <nav id="cm_menuItems" className={menuCls}>
            {itemsToRender}
          </nav>
        </div>
        <div id="cm_darkenScreen" className={darkCls} onClick={this.toggleMenu}></div>
      </div>
    );
  }
});

//fix menu when scrolling os make static due to window.pageYOffset
window.onload = function() {
  var menu = document.getElementById('menu');
  var header = document.getElementById('header');
  var overview = document.querySelector('#menu + section');
  var headerHeight = header.offsetHeight;

  //for correction of menu position when reloading page
  //and 0 < pageScroll < headerHeight
  menuPositionHandler;

  window.onscroll = menuPositionHandler;

  function menuPositionHandler() {
    var pageScroll = window.pageYOffset;

    if (pageScroll >= headerHeight) {
      menu.className = classNames({
        'fixed': true,
        '': true
      });
      //this styles should be applied directly to be
      //responcive to menu height
      header.style.paddingBottom = menu.offsetHeight + 'px';
    } else {
      menu.className = classNames({
        'fixed': false,
        '': true
      });
      header.style.paddingBottom = '0px';
    }
  }
};

function scrollTo(to, duration) {
  if (duration < 0) {
    return;
  }
  //This is for IE compability
  var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  var difference = to - top;
  var perTick = difference / duration * 10;

  setTimeout(function() {
    window.scroll(0, top + perTick);
    if (top == to) {
      //this is to prevent scrolling to top
      //after animation has been done in IE
      window.scroll(0, to);
      return;
    }
    scrollTo(to, duration - 10);
  }, 10);
}

module.exports = Menu;
