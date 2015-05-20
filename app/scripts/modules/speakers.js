'use strict';
var config = require('../config');
//store collapsed .speakers height
var collapsedSpeakersHeight;

//set collapsed .speakers height
(function() {
  var viewport = document.documentElement.clientWidth;
  var fifthSpeaker = document.getElementsByClassName('speaker')[4];
  var speakersWrap = fifthSpeaker.parentNode;

  if (viewport <= config.breakPoint) {
    speakersWrap.style.height = fifthSpeaker.offsetTop - speakersWrap.offsetTop + 'px';
    collapsedSpeakersHeight = speakersWrap.style.height;
  }

})();

(function() {
  var buttonText = {
    collapsed: 'See all speakers >>',
    expanded: 'Hide speakers <<'
  }

  var sreakersButton = document.querySelector('.speakers__expand-button');
  sreakersButton.innerHTML = buttonText.collapsed;

  sreakersButton.onclick = function(e) {
    var speakersWrap = e.target.previousSibling;
    toggleSpeakers(speakersWrap, buttonText, sreakersButton);
    //this function is located in schedule.jade
  };
})();

function toggleSpeakers(el, text, button) {
  var isExpanded = el.classList.contains('speakers__expanded');
  var speakers = button.previousSibling;
  button.innerHTML = !isExpanded ? text.expanded : text.collapsed;
  speakers.style.height = !isExpanded ? 'auto' : collapsedSpeakersHeight;
  el.classList.toggle('speakers__expanded');
}
