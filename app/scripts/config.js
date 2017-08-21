'use strict';

var config = {
  google: {
    calndrClientId: '910713467721-pnujab5h8bbnaqhorpen6c8s1qp3sclf.apps.googleusercontent.com',
    mapsAPIKey: 'AIzaSyC1b4B9v4bfOsDHrPk6u8ryB0j7tXGK6MU'
  },
  localePath: 'locales/en',
  pathIMG: {
    conf_logo: 'images/logo.jpg'
  },
  menuItems: [
    {component: 'registration', title: 'Buy Ticket'},
    {component: 'speakers', title: 'Speakers'},
    {component: 'schedule', title: 'Schedule'},
    {component: 'partners', title: 'Partners'},
    {component: 'location', title: 'Location'}
  ],
  modules: [
    {
      component: 'overview',
      isRendering: true
    },
    {
      component: 'speakers',
      isRendering: true
    },
    {
      component: 'schedule',
      isRendering: false
    },
    {
      component: 'registration',
      isRendering: true
    },
    {
      component: 'partners',
      isRendering: true
    },
    {
      component: 'location',
      isRendering: true
    }
  ],
  breakPoint: 768
};

module.exports = config;
