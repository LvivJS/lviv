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
    }
};

module.exports = utilities;
