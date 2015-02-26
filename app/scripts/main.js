'use strict';

var React = require('react');
var Header = require('./modules/Header');

var App = React.createClass({
  render: function() {
    return (
      <div>
       <Header />
      </div>
    )
  }
});

React.render(<App />, document.getElementById('app'));
