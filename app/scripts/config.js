'use strict';

var config = (function() {
  return {
    path: {
      schedule: './dev/json/schedule.json',
      speakers: './dev/json/speakers.json',
      partners: './dev/json/partners.json',
      mainInfo: './dev/json/mainInfo.json'
    },
    firebasePath: 'https://blistering-fire-6843.firebaseio.com/users'
  }
})()

module.exports = config;
