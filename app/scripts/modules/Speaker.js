'use strict';

var React = require('react');

var Speaker = React.createClass({
  render: function() {
    return(
     <div className="speaker">
      <div className="speaker__photo"><img src={this.props.info.photo_url}/></div>
      <div className="speaker__main">
       <h3 className="speaker__name">{this.props.info.name}</h3>
       <div className="speaker__pos">{this.props.info.position}</div>
       <div className="speaker__about">{this.props.info.about}</div>
      </div>
     </div>
    );
  }
});

module.exports = Speaker;
