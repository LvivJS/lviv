'use strict';

var React = require('react');
var files = require('../db_connector');

var Footer = React.createClass({
  getInitialState: function() {
    return {
      contacts: [],
      copyright: ''
    }
  },

  componentDidMount: function() {
    files.get('modules/footer', function(data) {
      var temp = data;
      this.setState({
        contacts: temp.contacts,
        copyright: temp.copyright
      });
    }.bind(this));
  },

  render: function() {
    var blocks = this.state.contacts.map(function(block) {
      var blockContact = block.contacts.map(function(contact) {
        var href = 'mailto:' + contact.email;
        return (
          <div className="block__contact" key={contact.name}>
            <span className="block__contact__name">{contact.name}</span>
            <span className="block__contact__phone">{contact.phone}</span>
            <a className="block__contact__email" href={href}>
              {contact.email}
            </a>
          </div>
        );
      });
      return (
        <div className="footer__block" key={new Date().now}>
          <h4 className="block__header">
            {block.title}
          </h4>
          {blockContact}
        </div>
      );
    });
    return (
      <footer id="footer" className="page-wrap footer">
        <div className="footer__container">
          {blocks}
        </div>
        <div className="footer__copyright">
          <div className="footer__container">
            <span className="copyright__text">{this.state.copyright}</span>
            <div className="footer__socials">

            </div>
          </div>
        </div>
      </footer>
    );
  }
});

module.exports = Footer;
