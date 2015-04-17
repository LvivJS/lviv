'use strict';

var availableLocales = ['en', 'uk'];
var defLang = 'en';
var navLng;
// no window.navigator in node.js
if (typeof window !== 'undefined') {
  navLng = window.navigator.browserLanguage || window.navigator.language;
}
//Check if navigator.language includes dash and strip after it
var userLang = navLng.substr(0, navLng.indexOf('-')) || navLng;
// var userLang = 'uk'; // set for testing purposes
var locale = ~availableLocales.indexOf(userLang) ? userLang : defLang;

var config = {
  firebasePath: 'https://blistering-fire-6843.firebaseio.com',
  mongoLab: {
    baseURL: 'https://api.mongolab.com/api/1/databases/conf_maker/collections/',
    apiKey: '?apiKey=' + 'Ms8hMESECxI5vzPKlJTHaAd-0PrpHMGY',
    modulesIds: {
      //This is for convenience.
      //when you are adding file to mongoLab collection
      //you are not able to name a file, but ids are automatically generated instead
      footer: '552d09d6e4b02d34e1525add',
      overview: '552d0a45e4b02d34e1525af2',
      location: '552d0a7fe4b02d34e1525b00',
      partners: '552d0abae4b02d34e1525b03',
      registration: '552d0ae8e4b02d34e1525b06',
      schedule: '552d0b23e4b02d34e1525b0a',
      speakers: '552d0bd0e4b02d34e1525b1f'
    }
  },
  localePath: 'locales/' + locale,
  pathIMG: {
    conf_logo: 'images/logo.jpg'
  },
  modules: [
    {
      title: {
        en: 'overview',
        uk: 'огляд'
      },
      isRendering: true,
      order: 0
    },
    {
      title: {
        en: 'speakers',
        uk: 'доповідачі'
      },
      isRendering: true,
      order: 1
    },
    {
      title: {
        en: 'schedule',
        uk: 'розклад'
      },
      isRendering: true,
      order: 2
    },
    {
      title: {
        en: 'location',
        uk: 'локація'
      },
      isRendering: true,
      order: 3
    },
    {
      title: {
        en: 'registration',
        uk: 'реєстрація'
      },
      isRendering: true,
      order: 4
    },
    {
      title: {
        en: 'partners',
        uk: 'партнери'
      },
      isRendering: true,
      order: 5
    }
  ]
};

module.exports = config;
