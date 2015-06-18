'use strict';

var utilities = require('../utilities');

function menu() {
  var menuToggler = document.getElementById('cm_menuToggle');
  var menuItems = document.getElementById('cm_menuItems');
  var overlay = document.getElementById('cm_darkenScreen');
  var links = menuItems.getElementsByClassName('menu__item');

  menuToggler.addEventListener('click', toggleMenu);
  menuItems.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  function toggleMenu() {
    menuItems.classList.toggle('menu--visible');
    overlay.classList.toggle('darkenScreen--visible');
  }

  Array.prototype.forEach.call(links, function(link) {
    link.addEventListener('click', menuLinkHandler);
  });

  function menuLinkHandler(e) {
    e.preventDefault();
    var getId = function(id) {
      return document.getElementById(id);
    };
    var menuMeasure = getId('menu').offsetHeight || getId('cm_menuToggle').offsetHeight;

    var menuHeight = menuMeasure;
    var hash = e.target.href.substr(e.target.href.indexOf('#') + 1);
    var anchor = document.getElementById(hash);
    var targetY = anchor.offsetTop - menuHeight;

    utilities.scrollTo(targetY, 300);
  }
}

module.exports = menu;
