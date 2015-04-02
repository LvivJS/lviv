'use strict';

var config = (function() {
  var modules = [
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
    ];
  //Look if we have users localisation, if not - use default.
  var chooseLocale = function() {
    //=======================================AVAILABLE LOCALES SEETINGS HERE
    var availableLocales = ['en', 'uk'];
    var defLang = 'en';
    var navLng = navigator.language;
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
    return setLocale;
  };
  var lang = chooseLocale();
  var path = {};
  var pathes = modules.map(function(module) {
    path[module.title] =  'locales/' + lang + '/' + module.title + '.json,'
  });
  console.log(path);
  return {
    path: {
      schedule: 'locales/' + lang + '/schedule.json',
      speakers: 'locales/' + lang + '/speakers.json',
      partners: 'locales/' + lang + '/partners.json',
      mainInfo: 'locales/' + lang + '/mainInfo.json',
      location: 'locales/' + lang + '/location.json',
      registration: 'locales/' + lang + '/registration.json',
      footer: 'locales/' + lang + '/footer.json',
      conf_logo: 'images/logo.jpg'
    },
    firebasePath: 'https://blistering-fire-6843.firebaseio.com/users',
    modules: modules
  }
})()

module.exports = config;
