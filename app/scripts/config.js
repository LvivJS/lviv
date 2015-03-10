'use strict';

var config = (function() {
  return {
    request: function(method, url, callBack) {
      var request = new XMLHttpRequest();
      request.open(method, url, true);
      request.onreadystatechange = function() {
        callBack(request.responseText);
      }
      request.send();
    },
    path: {
      schedule: './dev/json/schedule.json',
      speakers: './dev/json/speakers.json'
    }
  }
})()

module.exports = config;
