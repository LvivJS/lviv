'use strict';

var utilities = {
    ajax : function(method, url, callBack) {
      var request = new XMLHttpRequest();
      request.open(method, url, true);
      request.onreadystatechange = function() {
        if (request.readyState == 4) {
          if (request.status == 200) {
            callBack(request.responseText);
          }
        }
      };
      request.send();
    },
    time: function(timeObj) {
      var time = new Date();
      time.setYear(timeObj.year);
      time.setMonth(timeObj.month);
      time.setDate(timeObj.date);
      time.setHours(timeObj.hours);
      time.setMinutes(timeObj.minutes);
      return time
    }
};

module.exports = utilities;
