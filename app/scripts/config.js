'use strict';

var config = (function() {
  return {
    path: {
      schedule: './dev/json/schedule.json',
      speakers: './dev/json/speakers.json',
      partners: './dev/json/partners.json',
      mainInfo: './dev/json/mainInfo.json'
    },

    firebasePath: 'https://blistering-fire-6843.firebaseio.com/users',

    modules: [
      {
        title: 'header',
        isRendering: true,
        order: 1
      },
      {
        title: 'menu',
        isRendering: true,
        order: 2
      },
      {
        title: 'overview',
        isRendering: true,
        order: 3
      },
      {
        title: 'speakers',
        isRendering: true,
        order: 4
      },
      {
        title: 'schedule',
        isRendering: true,
        order: 5
      },
      {
        title: 'location',
        isRendering: true,
        order: 6
      },
      {
        title: 'registration',
        isRendering: true,
        order: 7
      },
      {
        title: 'partners',
        isRendering: true,
        order: 8
      },
      {
        title: 'footer',
        isRendering: true,
        order: 9
      }
    ]
  }
})()

module.exports = config;
