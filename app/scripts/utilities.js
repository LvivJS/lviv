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
    time: {
      createDate: function(timeObj) {
        var time = new Date();
        time.setYear(timeObj.year);
        time.setMonth(timeObj.month);
        time.setDate(timeObj.date);
        time.setHours(timeObj.hours || null);
        time.setMinutes(timeObj.minutes || null);
        return time
      },
      convertForGoogleCalend: function(date) {
        var year, month, day, hours, minutes, formatted;
        year = date.getFullYear();
        month = date.getMonth() + 1;
        day = date.getDate();
        hours = date.getHours();
        minutes = date.getMinutes();
        if (month < 10) {month = '0' + month};
        if (day < 10) {day = '0' + day};
        if (hours < 10) {hours = '0' + hours};
        if (minutes < 10) {minutes = '0' + minutes};
        formatted = '' + year + month + day + 'T' + hours + minutes + '00';
        return formatted
      }
    }
};

module.exports = utilities;
