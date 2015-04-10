'use strict';

var React = require('react');
var UiComp = require('./ui_components.jsx')

var SocialIconLink = React.createClass({
  render: function() {
    return (
      <a className={this.props.clName} href={this.props.Href} target="_blank" title={this.props.network}>
        <UiComp img={this.props.network} />
      </a>
    )
  }
});

module.exports = SocialIconLink;
