'use strict';

var availableLocales = ['en', 'uk'];
var defLang = 'en';
var navLng;
// no window.navigator in node.js
if (typeof window !== 'undefined') {
  navLng = window.navigator.browserLanguage || window.navigator.language;
}
//Check if navigator.language includes dash and strip after it
// var userLang = navLng.substr(0, navLng.indexOf('-')) || navLng;
var userLang = 'uk'; // set for testing purposes
var locale = ~availableLocales.indexOf(userLang) ? userLang : defLang;

var config = {
  firebasePath: 'https://blistering-fire-6843.firebaseio.com',
  localePath: 'locales/' + locale,
  pathIMG: {
    conf_logo: 'images/logo.jpg'
  },
  modules: [
    {
      title: 'overview',
      isRendering: true,
      order: 0
    },
    {
      title: 'speakers',
      isRendering: true,
      order: 1
    },
    {
      title: 'schedule',
      isRendering: true,
      order: 2
    },
    {
      title: 'location',
      isRendering: true,
      order: 3
    },
    {
      title: 'registration',
      isRendering: true,
      order: 4
    },
    {
      title: 'partners',
      isRendering: true,
      order: 5
    }
  ]
};

module.exports = config;
