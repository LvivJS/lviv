'use strict';

var menu = require('./modules/menu.js');
var locationMap = require('./modules/locationMap.js');
var registration = require('./modules/registration.js');
var schedule = require('./modules/schedule.js');
var speakers = require('./modules/speakers.js');

//TODO: somehow disable locatinMap for mobiles
menu();
locationMap('View on Google Maps');
registration();
schedule();
speakers('See all speakers');
