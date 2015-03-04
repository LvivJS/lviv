'use strict';

var React = require('react');

var Schedule = React.createClass({
  getInitialState: function() {
    return {
    }
  },

  componentDidMount: function() {
    var req = new XMLHttpRequest();
    req.open('get', '', true);
    req.onreadystatechange = function() {
    }.bind(this);
    req.send();
  },

  render: function() {
    return (
      <div className="schedule">
        
      </div>
    );
  }
});

module.exports = Schedule;
