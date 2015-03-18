'use strict';

var React = require('react');

var Footer = React.createClass({
  render: function() {
    return (
      <footer id="footer" className="page-wrap footer">
        <div className="footer__container">
          <span className="footer__info">&copy; Taras Kharuk</span>
        </div>
      </footer>
    );
  }
});

module.exports = Footer;
