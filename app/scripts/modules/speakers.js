'use strict';

var config = require('../config');

function speakers(btnText) {
  var allSpeakers = document.getElementsByClassName('speaker');
  var fourthSpeaker = allSpeakers[3];
  var speakersWrap = fourthSpeaker.parentNode;
  var isExpanded = false;
  var btn = document.createElement('div');
  var text = document.createTextNode(btnText + ' >>');

  btn.className = 'speakers__expand-button';
  btn.appendChild(text);
  btn.addEventListener('click', function(e) {
    speakersWrap.style.height = 'auto';
    speakersWrap.parentNode.removeChild(btn);
    isExpanded = true;
  });

  //set collapsed .speakers height
  window.onload = collapseSpeakers;
  window.onresize = collapseSpeakers;

  function collapseSpeakers() {
    var viewport = window.innerWidth;
    var fourthSpeakerTop = fourthSpeaker.offsetTop;
    var fourthSpeakerBottom = fourthSpeakerTop + fourthSpeaker.offsetHeight;

    if (viewport <= config.breakPoint && allSpeakers.length > 4 && !isExpanded) {
      speakersWrap.style.height = fourthSpeakerBottom - speakersWrap.offsetTop + 'px';
      speakersWrap.parentNode.appendChild(btn);
    } else {
      speakersWrap.style.height = 'auto';
    }
  };
}

module.exports = speakers;
