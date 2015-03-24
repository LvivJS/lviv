'use strict';

var React = require('react');
var utilities = require('../utilities');
var config = require('../config');

var Footer = React.createClass({
  getInitialState: function() {
    return ({
      text: ''
    });
  },

  componentDidMount: function() {
    utilities.ajax('get', config.path.footer, function(data) {
      var temp = JSON.parse(data);
      this.setState({
        text: temp.text
      });
    }.bind(this));
  },
  render: function() {
    return (
      <footer id="footer" className="page-wrap footer">
        <div className="footer__container">
          <a href="http://github.com/TuxujPes" target="_blank" className="footer__info">{this.state.text}</a>
        </div>
      </footer>
    );
  }
});

module.exports = Footer;
