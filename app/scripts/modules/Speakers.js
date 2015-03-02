'use strict';

var React = require('react');
var Speaker = require('./Speaker');

var Speakers = React.createClass({
  getInitialState: function() {
    return (
      {speakerInfo: []}
    )
  },
  componentDidMount: function() {
    var req = new XMLHttpRequest();
    req.open('get', './dev/json/speakers.json', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.onreadystatechange = function() {
      this.setState({speakerInfo: JSON.parse(req.responseText)});
    }.bind(this);
    req.send();
  },
  render: function() {
    var oneSpeaker = this.state.speakerInfo.map(function(info) {
      return <Speaker key={info.name} information={info} />
    });

    return (
     <div className="speakers">
      {oneSpeaker}
     </div>
    );
  }
});

module.exports = Speakers;
