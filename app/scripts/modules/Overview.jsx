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
        return <Dates date={this.state.mainInfo.start_date} />
      }
    }.bind(this);
    return (
      <section id="overview" className="page-wrap">
        <div className="overview">
        <div className="overview__content">
          <h2>{this.state.mainInfo.name}</h2>
          <div className="overview__about">{this.state.mainInfo.about}</div>
          <div className="overview__info">
            <div className="overview__infoBlock">
              <div className="overview__infoIcon">
                <UiComp image="time" />
              </div>
              <div className="overview__infoData overview__infoData--when">
                {date()}
              </div>
            </div>
            <div className="overview__infoBlock">
              <div className="overview__infoIcon">
                <UiComp image="location" />
              </div>
              <div className="overview__infoData overview__infoData--where">
                <span>{this.state.mainInfo.location}</span>
              </div>
            </div>
          </div>
          <div className="overview__wrap"></div>
        </div>
        </div>
      </section>
    )
  }
});

var Dates = React.createClass({
  mixins: [IntlMixin],
  render:function(){
    return(
      <span>
        <FormattedDate
          value={new Date(this.props.date)}
          day="numeric"
          month="long"
          year="numeric" /><br/>
        <FormattedTime
          value={new Date(this.props.date)}
          hour="numeric"
          minute="numeric" />
      </span>
    )
  }
});

module.exports = OverviewBlock;
