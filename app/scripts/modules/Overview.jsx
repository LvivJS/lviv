'use strict';

var React = require('react');
var config = require('../config');
var utilities = require('../utilities');
var UiComp = require('../components/ui_components.jsx');
var ReactIntl = require('react-intl');
var IntlMixin     = ReactIntl.IntlMixin;
var FormattedDate = ReactIntl.FormattedDate;
var FormattedTime = ReactIntl.FormattedTime;
var files = require('../db_connector');

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
    var date = function() {
      if (this.state.mainInfo.hasOwnProperty('start_date')) {
        return <Dates date={this.state.mainInfo} />
      }
    }.bind(this);
    return (
      <section id="overview" className="page-wrap overview">
          <h2>{this.state.mainInfo.name}</h2>
          <div className="overview__about">{this.state.mainInfo.about}</div>
          {date()}
          <div className="overview__wrap"></div>
      </section>
    )
  }
});

var Dates = React.createClass({
  mixins: [IntlMixin],
  render:function(){
    return(
      <div className="overview__info">
        <div className="overview__infoBlock">
          <div className="overview__infoIcon">
            <UiComp img="time" />
          </div>
          <div className="overview__infoData">
            <FormattedDate
              value={new Date(this.props.date.start_date)}
              day="numeric"
              month="long"
              year="numeric" />
            <FormattedTime
              value={new Date(this.props.date.start_date)}
              hour="numeric"
              minute="numeric" />
          </div>
        </div>
        <div className="overview__infoBlock">
          <div className="overview__infoIcon">
            <UiComp img="location" />
          </div>
          <div className="overview__infoData">
            {this.props.date.location}
          </div>
        </div>
      </div>
    )
  }
});

module.exports = OverviewBlock;
