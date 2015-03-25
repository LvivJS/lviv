var React = require('react');
var config = require('../config');
var utilities = require('../utilities');
var UiComp = require('../components/ui_components.jsx');
var ReactIntl = require('react-intl');
var IntlMixin     = ReactIntl.IntlMixin;
var FormattedDate = ReactIntl.FormattedDate;
var FormattedTime = ReactIntl.FormattedTime;

var OverviewBlock = React.createClass({
  mixins: [IntlMixin],
  getInitialState: function(){
    return {
      mainInfo: []
    }
  },
  componentDidMount: function() {
    utilities.ajax('get', config.pathJSON('mainInfo'), function(data) {
      this.setState({mainInfo: JSON.parse(data)});
    }.bind(this));
  },
  render: function() {
    var conferenceInfo = this.state.mainInfo.map(function(info){
      return <Overview mainInfo={info} key={info.name}/>
    });
    return (
      <section id="overview" className="page-wrap">
        <div className="overview">
          {conferenceInfo}
          <div className="overview__wrap"></div>
        </div>
      </section>
    )
  }
});

var Overview = React.createClass({
  mixins: [IntlMixin],
  getInitialState:function(){
    return {
      confTime:null
    }
  },
  componentWillMount: function() {
    var confTime = utilities.time.createDate(this.props.mainInfo.start_date);
    this.setState({confTime:confTime})
  },
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
                  value={this.state.confTime}
                  day="numeric"
                  month="long"
                  year="numeric" /><br/>
                <FormattedTime
                  value={this.state.confTime}
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
      </div>
    )
  }
});

module.exports = OverviewBlock;
