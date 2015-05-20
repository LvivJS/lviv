'use strict';
var viewport = window.innerWidth;
var info = document.getElementsByClassName('loc-info')[0];
var config = require('../config');

if (viewport > config.breakPoint) {
  info.onclick = function toggleInfo() {
    info.classList.toggle('loc-info--min');
  }
}
//reset info block styles when #location is not in viewport scope
var clientHeight = document.documentElement.clientHeight;
var menuHeight = document.getElementById('menu').offsetHeight;
document.onscroll = function() {
  var parent = document.getElementById('locations');
  var el = parent.firstChild;
  if (window.pageYOffset < parent.offsetTop - clientHeight ||
  window.pageYOffset >= (parent.offsetTop + parent.offsetHeight) - menuHeight) {
    el.classList.remove('loc-info--min');
  }
}
