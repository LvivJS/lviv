'use strict';

var utilities = {
  ajax: function(method, url, callBack, obj) {
    var request = new XMLHttpRequest();
    request.open(method, url, true);
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        if (request.status == 200) {
          var temp = JSON.parse(request.responseText);
          callBack(temp);
        }
      }
    };
    if (method == 'post') {
      var data = JSON.stringify(obj);
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(data);
      request.onreadystatechange = function() {
      if (request.readyState == 4) {
        callBack(request.status);
      }
    };
    } else {
      request.send();
    }
  },
  time: {
    convertForCalendLink: function(date, linkType) {
      var year, month, day, hours, minutes, formatted;
      var date = new Date(date);
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
  },
  calendLinks: {
    googleCalendar: function(obj) {
      var calendLink =
        'https://www.google.com/calendar/event?action=TEMPLATE&text=' + obj.article +
        '&dates=' + utilities.time.convertForCalendLink(obj.time.start) + '/' +
        utilities.time.convertForCalendLink(obj.time.end) +
        '&details=' + (obj.about || '') +
        '&location=' + obj.location +
        '&trp=false&sprop=name:'
      return calendLink
    },
    iCalendar: function(obj) {
      window.open(
        'data:text/calendar;charset=utf8,' +
        escape('BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:') +
        utilities.time.convertForCalendLink(obj.time.start) +
        escape('\nDTEND:') + utilities.time.convertForCalendLink(obj.time.end) +
        escape('\nSUMMARY:') + obj.article +
        escape('\nDESCRIPTION:') + (obj.about || '') +
        escape('\nLOCATION:') + obj.location +
        escape('\nEND:VEVENT\nEND:VCALENDAR')
      );
    }
  },
  scrollTo: function scrollTo(to, duration) {
    if (duration < 0) {
      return;
    }
    //This is for IE compability
    var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var difference = to - top;
    var perTick = difference / duration * 10;

    setTimeout(function() {
      window.scroll(0, top + perTick);
      if (top == to) {
        //this is to prevent scrolling to top
        //after animation has been done in IE
        window.scroll(0, to);
        return;
      }
      scrollTo(to, duration - 10);
    }, 10);
  }
};

module.exports = utilities;
