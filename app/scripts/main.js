'use strict';

var menu = require('./modules/menu.js');
var locationMap = require('./modules/locationmap.js');
var registration = require('./modules/registration.js');
var schedule = require('./modules/schedule.js');
var speakers = require('./modules/speakers.js');

menu();
locationMap();
registration();
schedule();
speakers('See all speakers');
