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

// NOTE : temporary solution : add livereload script on development
if (window.CM_DATA.env === 'development') {
  var liveReload = document.createElement('script');
  liveReload.src = '//localhost:9091';
  document.body.appendChild(liveReload)
}
