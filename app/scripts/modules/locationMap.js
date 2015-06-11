'use strict';

var config = require('../config');

function locMap(linkText) {
  var viewport = window.innerWidth;
  var menuHeight;
  var clientHeight;
  var info = document.getElementsByClassName('loc-info')[0];
  var infoParent = info.parentNode;
  var hasClick = false;

  var infoBlockClasses = {
    toggleMin: function() {
      info.classList.toggle('loc-info--min');
    },
    removeMin: function() {
      info.classList.remove('loc-info--min');
    }
  };
  //set initial event handlers of loc-info
  infoBlockEvents(viewport);

  window.addEventListener('resize', function() {
    viewport = window.innerWidth;
    infoBlockEvents(viewport);
  });

  //reset info block styles when #location is not in viewport scope
  document.addEventListener('scroll', function() {
    clientHeight = document.documentElement.clientHeight;
    menuHeight = document.getElementById('menu').offsetHeight;

    if (viewport > config.breakPoint) {
      if (window.pageYOffset < infoParent.offsetTop - clientHeight ||
      window.pageYOffset >= (infoParent.offsetTop + infoParent.offsetHeight) - menuHeight) {
        infoBlockClasses.removeMin();
      }
    }
  });

  //toggle position of loc-info
  function infoBlockEvents(viewport) {
    if ((viewport > config.breakPoint) && !hasClick) {
      hasClick = true;
      return info.addEventListener('click', toggleInfo, false);
    } else if (hasClick) {
      infoBlockClasses.removeMin();
      hasClick = false;
      return info.removeEventListener('click', toggleInfo, false);
    }
  }

  function toggleInfo() {
    infoBlockClasses.toggleMin();
  }

  //add map to the page
  function initialize() {
    var lat = config.google.coordinates.lat;
    var lng = config.google.coordinates.lng;
    var myLatlng = new google.maps.LatLng(lat, lng);
    var mapProp = {
      center: myLatlng,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      draggable: false
    };
    var map = new google.maps.Map(document.getElementById('googleMap'), mapProp);
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Awesome place for conference! See you there!'
    });
    //this will be used from control div
    var divHref = 'http://maps.google.com/maps?&z=' + mapProp.zoom + '&q=' + lat + ',' + lng;
    return addControlDiv(divHref);
  }

  google.maps.event.addDomListener(window, 'load', initialize);

  function addControlDiv(divHref) {
    var controlDiv = document.createElement('div');
    var controlDivLink = document.createElement('a');

    controlDiv.className = 'location__control';
    controlDivLink.className = 'location__controlText';
    controlDivLink.href = divHref;
    controlDivLink.target = '_blank';
    controlDivLink.innerHTML = linkText;

    controlDiv.appendChild(controlDivLink);
    document.getElementById('location').appendChild(controlDiv);
  }
};

module.exports = locMap;
