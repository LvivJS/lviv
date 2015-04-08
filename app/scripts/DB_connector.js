'use strict';
var config = require('./config');
var utilities = require('./utilities');

var FireBaseCon = {
    get: function(file, next) {
      var ref = new Firebase(config.firebasePath + '/' + file);
      // Attach an asynchronous callback to read the data at our posts reference
      ref.on("value", function(snapshot) {
        next( snapshot.val() );
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
          });
    },
    write: function() {

    },
    replace: function() {

    },
    delete: function() {

    }
  };

module.exports = FireBaseCon;
