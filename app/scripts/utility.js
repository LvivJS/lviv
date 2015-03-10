'use strict';

var ajax = function(method, url, callBack) {
  var request = new XMLHttpRequest();
  request.open(method, url, true);
  request.onreadystatechange = function() {
    callBack(request.responseText);
  }
  request.send();
};

module.exports = ajax;
