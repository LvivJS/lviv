'use strict';

var React = require('react');
var LayoutBasic = require('./modules/Layout(basic)');

var App = React.createClass({
  render: function() {
    return (
       <LayoutBasic />
    )
  }
});

React.render(<App />, document.getElementById('app'));
