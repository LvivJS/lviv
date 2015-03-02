'use strict';

var React = require('react');
var BasicLayout = require('./modules/BasicLayout');

var App = React.createClass({
  render: function() {
    return (
       <BasicLayout />
    )
  }
});

React.render(<App />, document.getElementById('app'));
