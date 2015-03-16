'use strict';

var React = require('react');
var config = require('../config');
var utilities = require('../utilities');

var Schedule = React.createClass({
  getInitialState: function() {
    return {
      conferences: [],
    }
  },
  componentDidMount: function() {
    utilities.ajax('get', config.path.schedule, function(data) {
      this.setState({conferences: JSON.parse(data)})
    }.bind(this));
  },
  render: function() {
    var conferences = this.state.conferences.map(function(conference) {
      return (<Conference key={conference.name} days={conference.days} name={conference.name} />)
    });
    return (
      <div className="schedule">
        {conferences}
      </div>
    );
  }
});

var Conference = React.createClass({
  getInitialState: function() {
    return {
      activeTable: this.props.days[0],
      activeDay: this.props.days[0].day_id,
      confIsVisible: true
    }
  },
  changeTab: function(day) {
    this.setState({
      activeTable: day,
      activeDay: day.day_id
    });
  },
  changeConfRepresent: function() {
    this.setState({confIsVisible: !this.state.confIsVisible});
  },
  render: function() {
    var days = this.props.days.map(function(day) {
      return (
        <li onClick={this.changeTab.bind(null, day)} key={day.day_id}
          className={(this.state.activeDay==day.day_id) ? "conference__tab--active" : null}>
          <span>{day.day_name}</span>
        </li>
      )
    }.bind(this));
    var timetable = this.props.days.map(function(day) {
      if (day.day_id == this.state.activeDay && this.state.confIsVisible) {
        return <Timetable sessions={day.timetable} key={day.day_id}/>
      };}.bind(this));
    return (
      <div className="conference">
        <div className="conference__title">
          <h3>Shedule: {this.props.name}</h3>
          <input type="button" onClick={this.changeConfRepresent}
            className={this.state.confIsVisible ? "up-arrow" : "down-arrow"}/>
        </div>
        {this.state.confIsVisible ? <ul>{days}</ul> : null}
        {timetable}
      </div>
    );
  }
});

var Timetable = React.createClass({
  getInitialState: function() {
    return {
      sessions:this.props.sessions,
      smallScreen: (window.innerWidth <= 320)
    }
  },
  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },
  handleResize: function() {
    var smallScreen = 320;
    var windowWidth = window.innerWidth;
    this.setState({smallScreen: (windowWidth <= smallScreen)})
  },
  render: function() {
    var sessions = this.state.sessions.map(function(session) {
      return <Session key={session.article} session={session} smallScreen={this.state.smallScreen}/>
    }.bind(this));
    return (
      <div className="timetable">
        {sessions}
      </div>
    );
  }
});

var Session = React.createClass({
  getInitialState: function() {
    return {
      session: this.props.session,
      isReport: this.props.session.type == 'report'
    }
  },
  changeAbout: function() {
    this.setState({isHidden:!this.state.isHidden});
  },
  componentWillReceiveProps: function() {
    this.setState({
      isHidden: this.props.smallScreen
    });
  },
  render: function() {
    var sessionClass = 'session ';
    var sessionInfoClass = 'session__info ';
    var sessionAboutClass = 'session__about ';
    var sessionButtonClass = 'session__button ';
    var speaker = null;
    var button = null;

    if (this.state.isReport) {
      sessionClass += 'session--report';
      speaker = (
        <span className="speaker__name">
          {this.state.session.speaker.name}
          {this.state.session.speaker.position}
        </span>
      )
    } else {
      sessionClass += 'session--entertainment';
      sessionInfoClass += 'session__info--right';
    };

    if (this.state.isHidden) {
      sessionAboutClass += 'invisible'
      sessionButtonClass += 'session__button--inactive'
    } else {
      sessionButtonClass += 'session__button--active'
    };
    if (this.state.session.about) {
      button = (
        <span onClick={this.changeAbout.bind(null,this.state.session)} className= {sessionButtonClass}>
        </span>
      )
    }
    return (
      <div key={this.state.session.article}
       className={sessionClass}>
        <div className="session__time">{this.state.session.time}</div>
        <div className="session__arrangement">
          <h4 className="session__name">{this.state.session.article}</h4>
          <div className={sessionInfoClass}>
            {speaker}
            {button}
          </div>
          <div className={sessionAboutClass}>
              {this.state.session.about}
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Schedule;
