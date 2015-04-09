'use strict';

var config = (function() {

  return {
    //Look if we have users localisation, if not - use default.
    pathJSON: function(module) {
      //=======================================AVAILABLE LOCALES SEETINGS HERE
      var availableLocales = ['en', 'uk'];
      var defLang = 'en';
      var navLng = navigator.browserLanguage || navigator.language;
      //Check if navigator.language includes dash
      var userLang = navLng.substr(0, navLng.indexOf('-')) || navLng;
      var setLocale;

      //Actually set proper path
      for (var i = 0; i < availableLocales.length; i++) {
        if (availableLocales[i] == userLang) {
          setLocale = availableLocales[i];
          break;
        } else {
          setLocale = defLang;
        }
      }
      return 'locales/' + setLocale + '/' + module + '.json';
    },
    pathIMG: {
      conf_logo: 'images/logo.jpg'
    },

    firebasePath: 'https://blistering-fire-6843.firebaseio.com',

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
  }
})();

module.exports = config;
