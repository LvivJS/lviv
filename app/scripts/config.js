'use strict';

var config = (function() {
  //Look if we have users localisation, if not - use default.
  var chooseLocale =  function() {
    //=======================================AVAILABLE LOCALES SEETINGS HERE
    var availableLocales = ['en', 'uk', {defLang: 'en'}];
    var navLng = navigator.language;
    var userLang;
    var setLocale;
    var defLang;

    //Check if navigator.language includes dash
    if (navLng.indexOf('-') != -1) {
      userLang = navLng.substr(0, navLng.indexOf('-'));
    } else {
      userLang = navLng;
    }
    //Actually set proper path
    for (var i = 0; i < availableLocales.length; i++) {
      if (typeof availableLocales[i] == 'object') {
        defLang = availableLocales[i].defLang;
      }
      if (availableLocales[i] == userLang) {
        setLocale = availableLocales[i];
        break;
      } else {
        setLocale = defLang;
      }
    }

    return setLocale;
  };

  var loc = chooseLocale();

  return {
    path: {
      schedule: 'locales/' + loc + '/schedule.json',
      speakers: 'locales/' + loc + '/speakers.json',
      partners: 'locales/' + loc + '/partners.json',
      mainInfo: 'locales/' + loc + '/mainInfo.json',
      location: 'locales/' + loc + '/location.json',
      registration: 'locales/' + loc + '/registration.json',
      footer: 'locales/' + loc + '/footer.json',
      conf_logo: 'images/logo.jpg'
    },

    firebasePath: 'https://blistering-fire-6843.firebaseio.com/users',

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
