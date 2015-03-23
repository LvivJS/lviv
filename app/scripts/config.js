'use strict';

var config = (function() {
  return {
    path: {
      schedule: 'json/schedule.json',
      speakers: 'json/speakers.json',
      partners: 'json/partners.json',
      mainInfo: 'json/mainInfo.json',
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
    ],
    language: 'en-US'
  }
})()

module.exports = config;
