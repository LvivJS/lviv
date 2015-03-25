'use strict';

var React = require('react');
var BasicLayout = require('./modules/BasicLayout');
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;

var intlData = {
  'locales': 'en-US'
};

var App = React.createClass({
  mixins: [IntlMixin],
  render: function() {
    return (
       	<BasicLayout />
    )
  }
});

React.render(<App /*{...intlData}*//>, document.getElementById('app'));
