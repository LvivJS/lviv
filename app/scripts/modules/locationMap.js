'use strict';

var config = require('../config');

function locMap() {
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
};

module.exports = locMap;
