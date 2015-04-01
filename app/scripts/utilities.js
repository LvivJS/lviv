'use strict';

var utilities = {
  ajax: function(method, url, callBack) {
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
    convertForCalend: function(date, linkType) {
      var link;
      if ((date.month < 10) && (linkType == 'googleCalendar')) {
        date.month = '0' + (+date.month + 1)
      };
      if (date.date < 10) {date.date = '0' + +date.date};
      if (date.hours < 10) {date.hours = '0' + +date.hours};
      if (date.minutes < 10) {date.minutes = '0' + +date.minutes};
      link = '' + date.year + date.month + date.date + 'T' + date.hours + date.minutes + '00';
      return link
    }
  },
  calendLinks: {
    googleCalendar: function(obj) {
      var calendLink =
        'https://www.google.com/calendar/event?action=TEMPLATE&text=' + obj.article +
        '&dates=' + utilities.time.convertForCalend(obj.time.start, 'googleCalendar') + '/' +
        utilities.time.convertForCalend(obj.time.end, 'googleCalendar') +
        '&details=' + (obj.about || '') +
        '&location=' + obj.location +
        '&trp=false&sprop=name:'
      return calendLink
    },
    iCalendar: function(obj) {
      window.open(
        'data:text/calendar;charset=utf8,' +
        escape('BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:') +
        utilities.time.convertForCalend(obj.time.start, 'iCalendar') +
        escape('\nDTEND:') + utilities.time.convertForCalend(obj.time.end, 'iCalendar') +
        escape('\nSUMMARY:') + obj.article +
        escape('\nDESCRIPTION:') + (obj.about || '') +
        escape('\nLOCATION:') + obj.location +
        escape('\nEND:VEVENT\nEND:VCALENDAR')
      );
    }
  }
};

module.exports = utilities;
