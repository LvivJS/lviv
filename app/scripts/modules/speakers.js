'use strict';

var config = require('../config');

function speakers() {
  //set collapsed .speakers height
  window.onload = function() {
    var viewport = document.documentElement.clientWidth;
    var fourthSpeaker = document.getElementsByClassName('speaker')[3];
    var speakersWrap = fourthSpeaker.parentNode;
    var fourthSpeakerTop = fourthSpeaker.offsetTop;
    var fourthSpeakerBottom = fourthSpeakerTop + fourthSpeaker.offsetHeight;

    if (viewport <= config.breakPoint) {
      speakersWrap.style.height = fourthSpeakerBottom - speakersWrap.offsetTop + 'px';
    }
  };

  (function() {

    var sreakersButton = document.querySelector('.speakers__expand-button');

    sreakersButton.onclick = function(e) {
      var speakersWrap = e.target.previousSibling;
      var speakers = sreakersButton.previousSibling;

      speakers.style.height = 'auto';
      speakersWrap.parentNode.removeChild(sreakersButton);
    };
  })();
}

module.exports = speakers;
