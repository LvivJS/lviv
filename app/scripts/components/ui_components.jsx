'use strict';

var React = require('react');

var UiComp = React.createClass({
  images: function() {
    var arrowUp = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 306 306" fill="#004384">
        <path className="arrows" d="M35.7 247.35L153 130.05l117.3 117.3 35.7-35.7-153-153-153 153z"/>
      </svg>
    );
    var arrowDown = (
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 306 306" enable-background="new 0 0 306 306" fill="#004384">
        <path className="arrows" d="M270.3 58.65L153 175.95 35.7 58.65 0 94.35l153 153 153-153z"/>
      </svg>
    );
    var location = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.825 47.825" fill="#fff">
        <path d="M36.44 12.646C36.44 5.726 30.83.12 23.91.12S11.385 5.726 11.385 12.645c0 9.913 12.527 24.582 12.527 24.582s12.53-14.72 12.53-24.582zm-18.707-.748c0-3.413 2.767-6.18 6.18-6.18s6.178 2.767 6.178 6.18-2.766 6.18-6.178 6.18-6.18-2.767-6.18-6.18z"/>
          <circle cx="23.911" cy="11.898" r="3.038"/>
        <path d="M30.994 32.87c-1.02 1.476-1.98 2.76-2.777 3.793 7.916.476 13.104 2.185 15.034 3.456-2.26 1.49-8.978 3.586-19.337 3.586-10.358 0-17.077-2.097-19.338-3.587 1.93-1.272 7.114-2.98 15.022-3.456-.8-1.032-1.76-2.316-2.78-3.792C7.074 33.832 0 36.712 0 40.118c0 4.19 10.707 7.588 23.913 7.588 13.207 0 23.912-3.396 23.912-7.588.002-3.407-7.08-6.29-16.83-7.248z"/>
      </svg>
    );
    var time = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 612" fill="#fff">
        <path d="M306 0C136.992 0 0 136.992 0 306s136.992 306 306 306 306-137.012 306-306S475.008 0 306 0zm0 573.157C158.45 573.157 38.843 453.55 38.843 306 38.843 158.45 158.45 38.843 306 38.843c147.55 0 267.157 119.608 267.157 267.157 0 147.55-119.607 267.157-267.157 267.157zm19.125-457.202h-37.657l.593 209.782L420.14 438.69l23.313-32.877-118.325-99.22V115.954z"/>
      </svg>
    );
    if (this.props.image == 'arrowUp') {
      return arrowUp
    } else if (this.props.image == 'arrowDown') {
      return arrowDown
    } else if (this.props.image == 'location') {
      return location 
    } else if (this.props.image == 'time') {
      return time 
    } else {
      return null
    }
  },
  render: function() {
    return (
      <span>
        {this.images()}
      </span>
    )
  }
});

module.exports = UiComp;