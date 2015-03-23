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
    locales: function() {
      var availableLocals = ['en-US', 'uk-UA'];
      var defaultLocale = 'en-US';
      var loc;

      for (i = 0; i < availableLocals.length; i++) {
        if (availableLocals[i] == navigator.language) {
          loc = availableLocals[i];
          break;
        } else {
          loc = defaultLocale;
        }
      }
      return loc;
    }
};

module.exports = utilities;
