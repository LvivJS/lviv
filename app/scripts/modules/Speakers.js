'use strict';

var React = require('react');
var Speaker = require('./Speaker')

var Speakers = React.createClass({
  getInitialState: function() {
    return {speakerInfo: []};
  },
  getSpeakersInfo: function () {
    var req = new XMLHttpRequest();
    req.open('get', './dev/json/speakers.json');
    req.onreadystatechange = function() {
      
    };
    req.send(null);
  },
  componentWillMount: function(data) {
    this.setState({speakerInfo: req.responseText});

  },
  render: function() {
    console.log(this.state.speakerInfo);
    var oneSpeaker = this.state.speakerInfo.map(function(info){
      return <Speaker info={info}/>
    });
    

    return(
     <div className="speakers">
      {oneSpeaker}
     </div>
    );
  }
});

module.exports = Speakers;
