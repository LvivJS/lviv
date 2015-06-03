'use strict';

var config = require('../config');

function speakers() {
  var allSpeakers = document.getElementsByClassName('speaker');
  var fourthSpeaker = allSpeakers[3];
  var speakersWrap = fourthSpeaker.parentNode;
  var isExpanded = false;

  //set collapsed .speakers height
  window.onload = collapseSpeakers;
  window.onresize = collapseSpeakers;

  function collapseSpeakers() {
    var viewport = document.documentElement.clientWidth;
    var fourthSpeakerTop = fourthSpeaker.offsetTop;
    var fourthSpeakerBottom = fourthSpeakerTop + fourthSpeaker.offsetHeight;

    if (viewport <= config.breakPoint && allSpeakers.length > 4 && !isExpanded) {
      speakersWrap.style.height = fourthSpeakerBottom - speakersWrap.offsetTop + 'px';
    } else {
      speakersWrap.style.height = 'auto';
    }
  };

  (function() {
    var sreakersButton = document.querySelector('.speakers__expand-button');

    sreakersButton.onclick = function(e) {
      speakersWrap.style.height = 'auto';
      speakersWrap.parentNode.removeChild(sreakersButton);
      isExpanded = true;
    };
  })();
}

module.exports = speakers;
