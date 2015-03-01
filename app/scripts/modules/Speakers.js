'use strict';

var React = require('react');
var Speaker = require('./Speaker')

var Speakers = React.createClass({
  getInitialState: function() {
    return (
      {speakerInfo: []}
    )
  },
  componentDidMount: function() {
    var req = new XMLHttpRequest();
    req.open('get', './dev/json/speakers.json');
    req.onreadystatechange = function() {
      var respond = JSON.parse(req.responseText);
      this.setState({speakerInfo: respond});
    }.bind(this);
    req.send();
  },
  render: function() {
    var oneSpeaker = this.state.speakerInfo.map(function(info) {
      return <Speaker info={info}/>
    });

    return (
     <div className="speakers">
      {oneSpeaker}
     </div>
    );
  }
});

module.exports = Speakers;
