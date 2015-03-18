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
      },
    ]
  }
})()

module.exports = config;
