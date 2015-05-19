'use strict';

var React = require('react');
var files = require('../db_connector');
var moment = require('moment');

var OverviewBlock = React.createClass({
  getInitialState: function(){
    return {
      mainInfo: {}
    }
  },
  componentDidMount: function() {
    files.get('modules/overview',  function(data) {
      this.setState({mainInfo: data});
    }.bind(this));
  },
  render: function() {
    return (
      <section id="overview" className="page-wrap overview">
        <div className="overview-wrap">
          <h2 className="main-header">{this.state.mainInfo.name}</h2>
          <div className="overview__infoBlock">
            <span>{moment(this.state.mainInfo.start_date).format('MMM DD, YYYY')}</span>
            <span>{this.state.mainInfo.location}</span>
          </div>
        </div>
      </section>
    )
  }
});

module.exports = OverviewBlock;
