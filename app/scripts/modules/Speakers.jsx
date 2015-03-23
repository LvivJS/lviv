'use strict';

var React = require('react');
var config = require('../config');
var utilities = require('../utilities');
var classNames = require('classnames');

var Speakers = React.createClass({
  getInitialState: function() {
    return {
      speakerInfo: []
    }
  },
  componentDidMount: function() {
    utilities.ajax('get', config.path.speakers, function(data) {
      this.setState({speakerInfo: JSON.parse(data)});
    }.bind(this));
  },
  render: function() {
    var speakers = this.state.speakerInfo.map(function(info) {
      return <Speaker key={info.name} information={info} />
    });

    return (
      <section id="speakers" className="page-wrap">
        <h2 className="module-header">Speakers</h2>
        <div className="speakers">
         {speakers}
        </div>
      </section>
    );
  }
});

var Speaker = React.createClass({
  getInitialState: function() {
    return {
      contacts: this.props.information.contact
    }
  },
  setClass: function(network) {
    var classes = {
      'speaker__contact': this.state.contacts[network],
      'invisible': !this.state.contacts[network]
    };
    classes['speaker__contact--' + network] = this.state.contacts[network];
    return classNames(classes);
  },
  render: function() {
    var contToRender = Object.keys(this.state.contacts).map(function(val) {
      return <a className={this.setClass(val)} href={this.state.contacts[val]} key={val}></a>
    }.bind(this));

    return (
     <div className="speaker">
      <div className="speaker__photo">
        <img src={this.props.information.photo_url}/>
      </div>
      <div className="speaker__main">
        <h3 className="speaker__name">{this.props.information.name}</h3>
        <div className="speaker__pos">{this.props.information.position}</div>
        <div className="speaker__about">{this.props.information.about}</div>
          <div className="speaker__contacts">
            {contToRender}
          </div>
        </div>
     </div>
    )
  }
});

module.exports = Speakers;
