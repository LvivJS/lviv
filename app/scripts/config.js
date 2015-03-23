'use strict';
var utilities = require('./utilities');

var config = (function() {
  return {
    path: {
      schedule: 'locale/' + utilities.locales + '/schedule.json',
      speakers: 'locale/' + utilities.locales + '/speakers.json',
      partners: 'locale/' + utilities.locales + '/partners.json',
      mainInfo: 'locale/' + utilities.locales + '/mainInfo.json',
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
})()

module.exports = config;
