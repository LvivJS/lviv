'use strict';

var React = require('react');

var Speakers = React.createClass({
  getInitialState: function() {
    return (
      {speakerInfo: []}
    )
  },
  componentDidMount: function() {
    var req = new XMLHttpRequest();
    req.open('get', './dev/json/speakers.json', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.onreadystatechange = function() {
      this.setState({speakerInfo: JSON.parse(req.responseText)});
    }.bind(this);
    req.send();
  },
  render: function() {
    var speakers = this.state.speakerInfo.map(function(info) {
      return <Speaker key={info.name} information={info} />
    });

    return (
     <div className="speakers">
      {speakers}
     </div>
    );
  }
});

var Speaker = React.createClass({
  render: function() {
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
            <a className={this.props.information.contact[0].twitter ?
              "speaker__contact speaker__contact--twitter ":"invisible"} 
              href={this.props.information.contact[0].twitter}>
            </a>
            <a className={this.props.information.contact[0].facebook ? 
              "speaker__contact speaker__contact--facebook":"invisible"} 
              href={this.props.information.contact[0].facebook}>
            </a> 
            <a className={this.props.information.contact[0].linkedin ? 
              "speaker__contact speaker__contact--linkedin":"invisible"} 
              href={this.props.information.contact[0].linkedin}>
            </a> 
          </div> 
        </div>
     </div>
    )
  }
});

module.exports = Speakers;
