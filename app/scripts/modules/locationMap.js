'use strict';

var config = require('../config');

function locMap(linkText) {
  var viewport = window.innerWidth;
  var breakPoint = config.breakPoint;
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

  //toggle position of loc-info
  function infoBlockEvents(viewport) {
    if ((viewport > breakPoint) && !hasClick) {
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
      scrollwheel: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      draggable: true
    };
    var isWhellScroll;
    var divHref = 'http://maps.google.com/maps?&z=' + mapProp.zoom + '&q=' + lat + ',' + lng;
    var map = new google.maps.Map(document.getElementById('googleMap'), mapProp);
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Awesome place for conference! See you there!'
    });

    window.addEventListener('resize', addWheelZoom);

    //reset info block styles when #location is not in viewport scope
    document.addEventListener('scroll', function() {
      clientHeight = document.documentElement.clientHeight;
      menuHeight = document.getElementById('menu').offsetHeight;

      if (viewport > breakPoint) {
        if (window.pageYOffset < infoParent.offsetTop - clientHeight ||
        window.pageYOffset >= (infoParent.offsetTop + infoParent.offsetHeight) - menuHeight) {
          infoBlockClasses.removeMin();
          addWheelZoom();
        }
      }
    });

    //handle wheel zoom
    function addWheelZoom() {
      var locinfo = document.getElementsByClassName('loc-info')[0];
      if (viewport > breakPoint) {
        isWhellScroll = false;
        locinfo.addEventListener('click', handleWhellZoom);
      } else {
        isWhellScroll = true;
        locinfo.removeEventListener('click', handleWhellZoom);
      }
      return map.setOptions({'scrollwheel': isWhellScroll, 'draggable': isWhellScroll});
    }
    addWheelZoom();

    function handleWhellZoom() {
      if (!isWhellScroll) {
        isWhellScroll = true;
        map.setOptions({'scrollwheel': isWhellScroll, 'draggable': isWhellScroll});
      } else {
        isWhellScroll = false;
        map.setOptions({'scrollwheel': isWhellScroll, 'draggable': isWhellScroll});
      }
    }

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
