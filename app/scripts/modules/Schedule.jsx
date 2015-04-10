'use strict';

var React = require('react');
var config = require('../config');
var utilities = require('../utilities');
var classNames = require('classnames');
var UiComp = require('../components/ui_components.jsx');
var ReactIntl = require('react-intl');
var IntlMixin     = ReactIntl.IntlMixin;
var FormattedDate = ReactIntl.FormattedDate;
var FormattedTime = ReactIntl.FormattedTime;
var files = require('../db_connector');

var Schedule = React.createClass({
  mixins: [IntlMixin],
  getInitialState: function() {
    return {
      conferences: [],
      locales:''
    }
  },
  componentDidMount: function() {
    files.get('modules/schedule', function(data) {
      var temp = data;
      this.setState({
        conferences: temp.data,
        locales: temp.locales,
        });
    }.bind(this));
  },
  render: function() {
    var conferences = this.state.conferences.map(function(conference) {
      return <Conference key={conference.name} days={conference.days}
        name={conference.name} locales={this.state.locales} />
    }.bind(this));
    return (
      <section id="schedule" className="page-wrap">
        <h2 className="module-header">{this.state.locales.title}</h2>
        <div className="schedule">
          {conferences}
        </div>
      </section>
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
      var dayIsActive = (this.state.activeDay == day.day_id);
      var liClass = classNames({
        'conference__tab--active': dayIsActive
      });
      return (
        <li onClick={this.changeTab.bind(null, day)} key={day.day_id} className={liClass}>
          <FormattedDate
            value={new Date(day.day_info)}
            day="numeric"
            month="long" />
        </li>
      )
    }.bind(this));

    var timetable = this.props.days.map(function(day) {
      if (day.day_id == this.state.activeDay && this.state.confIsVisible) {
        return <Timetable sessions={day.timetable} key={day.day_id}
        location={day.location} locales={this.props.locales} />
      }
    }.bind(this));

    //set direction of arrow
    var toggleButtonImage = classNames({
        'schedule__toggleButton': true,
        'arrowDown': !this.state.confIsVisible
    });

    return (
      <div className="conference">
        <div className="conference__title">
          <h3>{this.props.locales.conf_schedule}{this.props.name}</h3>
          <span onClick={this.changeConfRepresent} className={toggleButtonImage}>
            <UiComp img='arrowUp' />
          </span>
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
      var timeStart =  new Date(session.time.start);
      if (session.time.end) {
        var timeEnd =  new Date(session.time.end)
      }
      session.location = this.props.location
      return (
        <Session key={session.article} session={session} smallScreen={this.state.smallScreen}
          start={timeStart} end={timeEnd} locales={this.props.locales} />
      )
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
  createCalendLink: function() {
    utilities.calendLinks.iCalendar(this.state.session);
  },
  render: function() {
    var speaker = null;
    var button = null;
    var timeEnd = null;
    var calendarLinks = null;

    if (this.state.isReport) {
      speaker = (
        <span className="speaker__name">
          {this.state.session.speaker.name}
          {this.state.session.speaker.position}
        </span>
      )
      calendarLinks = (
        <div className="session__calendButtons">
          <span>{this.props.locales.calend_links}</span> <br/>
          <a href={utilities.calendLinks.googleCalendar(this.state.session)} target="_blank" rel="nofollow"
            className="session__calendLink session__calendLink--gCal">Google Calendar</a>
          <a className="session__calendLink session__calendLink--iCal" onClick={this.createCalendLink}>iCalendar</a>
        </div>
      )
    };

    var sessionClass = classNames({
      'session': true,
      'session--report': this.state.isReport,
      'session--entertainment': !this.state.isReport
    });

    var sessionInfoClass = classNames({
      'session__info': true,
      'session__info--right': !this.state.isReport
    });

    var sessionAboutClass = classNames({
      'session__about': true,
      'invisible': this.state.isHidden
    });

    var sessionButtonClass = classNames ({
      'session__button': true,
      'session__button--inactive': this.state.isHidden,
      'session__button--active': !this.state.isHidden
    });

    if (this.state.session.about) {
      button = (
        <span onClick={this.changeAbout.bind(null,this.state.session)} className= {sessionButtonClass}>
        </span>
      )
    };
    if(this.props.end) {
      timeEnd = (
        <FormattedTime
            value={new Date(this.props.end)}
            hour="numeric"
            minute="numeric" />
      )
    }
    return (
      <div key={this.state.session.article}
       className={sessionClass}>
        <div className="session__time">
          <FormattedTime
            value={new Date(this.props.start)}
            hour="numeric"
            minute="numeric" />
          {timeEnd}
        </div>
        <div className="session__arrangement">
          <h4 className="session__name">{this.state.session.article}</h4>
          <div className={sessionInfoClass}>
            {speaker}
            {button}
          </div>
          <div className={sessionAboutClass}>
              {this.state.session.about}
          </div>
          {calendarLinks}
        </div>
      </div>
    )
  }
});

module.exports = Schedule;
