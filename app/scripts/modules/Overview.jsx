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
  mixins: [IntlMixin],
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
      <section id="overview" className="page-wrap">
        <div className="overview">
          <Overview mainInfo={this.state.mainInfo} />
        </div>
      </section>
    )
  }
});

var Overview = React.createClass({
  mixins: [IntlMixin],
  render:function(){
    return(
      <div className="overview__content">
        <h2>{this.props.mainInfo.name}</h2>
        <div className="overview__about">{this.props.mainInfo.about}</div>
        <div className="overview__info">
          <div className="overview__infoBlock">
            <div className="overview__infoIcon">
              <UiComp image="time" />
            </div>
            <div className="overview__infoData overview__infoData--when">
              <span>
                  <FormattedDate
                    value={new Date(this.props.mainInfo.start_date)}
                    day="numeric"
                    month="long"
                    year="numeric" /><br/>
                  <FormattedTime
                    value={new Date(this.props.mainInfo.start_date)}
                    hour="numeric"
                    minute="numeric" />
                </span>
            </div>
          </div>
          <div className="overview__infoBlock">
            <div className="overview__infoIcon">
              <UiComp image="location" />
            </div>
            <div className="overview__infoData overview__infoData--where">
              <span>{this.props.mainInfo.location}</span>
            </div>
          </div>
        </div>
        <div className="overview__wrap"></div>
      </div>
    )
  }
});

module.exports = OverviewBlock;
