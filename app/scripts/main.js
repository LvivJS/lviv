'use strict';

var React = require('react');
var Header = require('./modules/Header');
var Speakers = require('./modules/Speakers');

var App = React.createClass({
  render: function() {
    return (
      <div>
       <Header />
       <Speakers />
      </div>
    )
  }
});

React.render(<App />, document.getElementById('app'));
