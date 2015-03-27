'use strict';

var React = require('react');
var utilities = require('../utilities');
var config = require('../config');

var Footer = React.createClass({
  getInitialState: function() {
    return ({
      events: [],
      networks:{},
      mail:'',
      locales:{}
    });
  },
  componentDidMount: function() {
    utilities.ajax('get', config.path.footer, function(data) {
      var temp = JSON.parse(data);
      this.setState({
        events: temp.data.events,
        networks: temp.data.socials.networks,
        mail: temp.data.socials.email,
        locales: temp.locales
      });
    }.bind(this));
  },
  render: function() {
    return (
      <footer id="footer" className="page-wrap footer">
        <div className="footer__container">
          <CommunityEvents events={this.state.events} locales={this.state.locales} />
          <Connection networks={this.state.networks} mail={this.state.mail} locales={this.state.locales} />
        </div>
        <hr/>
        <div className="footer__copyright">
          <span>{this.state.locales.copyright}</span>
        </div>
      </footer>
    );
  }
});

var CommunityEvents = React.createClass({
  render: function() {
    var events = this.props.events.map(function(ev){
      return <a className="footer__event" href={ev.link} key={ev.name} target="_blank">{ev.name}</a>
    }.bind(this));
    return (
      <div className="footer__block">
        <h5 className="footer__headings">{this.props.locales.events_header}</h5>
        <div className="footer__eventLinks">
          {events}
        </div>
      </div>
    )
  }
});
          
var Connection = React.createClass({
  render: function() {
    var socials= Object.keys(this.props.networks).map(function(network) {
      var soc_class= "footer__social--" + network
      return <a className={soc_class} href={this.props.networks[network]}
                key={network} target="_blank"></a>
    }.bind(this));
    var mailto = "mailto:"+ this.props.mail;
    return (
      <div className="footer__block">
        <h5 className="footer__headings">{this.props.locales.connection_header}</h5>
        <div className="footer__socials">{socials}</div>
        <div className="footer__contacts">
          <span>{this.props.locales.contact_us}</span>
          <a className="footer__mailLink" href={mailto}>{this.props.mail}</a>
        </div>
      </div>
    )
  }
});
module.exports = Footer;


 
