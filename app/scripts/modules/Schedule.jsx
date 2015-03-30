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

var Schedule = React.createClass({
  getInitialState: function() {
    return {
      conferences: [],
      locales:''
    }
  },
  componentDidMount: function() {
    utilities.ajax('get', config.path.schedule, function(data) {
      var temp = JSON.parse(data);
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
            value={utilities.time.createDate(day.day_info)}
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
        'arrowUp': this.state.confIsVisible,
        'arrowDown': !this.state.confIsVisible
    });

    return (
      <div className="conference">
        <div className="conference__title">
          <h3>{this.props.locales.conf_schedule}{this.props.name}</h3>
          <span onClick={this.changeConfRepresent} className="schedule__toggleButton">
            <UiComp image={toggleButtonImage} />
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
      var timeStart = utilities.time.createDate(session.time.start);
      if (session.time.end) {
        var timeEnd = utilities.time.createDate(session.time.end)
      }
      return (
        <Session key={session.article} session={session} smallScreen={this.state.smallScreen}
          start={timeStart} end={timeEnd} location={this.props.location} locales={this.props.locales} />
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
  createGoogleCalendLink: function() {
    var calendLink = 
      "http://www.google.com/calendar/event?action=TEMPLATE&text=" + this.state.session.article +
      "&dates=" + utilities.time.convertForCalend(this.props.start) + '/' 
      + utilities.time.convertForCalend(this.props.end) +
      "&details=" + (this.state.session.about||'') + 
      "&location=" + this.props.location +
      "&trp=false&sprop=name:"
    return calendLink
  },
  createIcalLink: function() {
    window.open(
      "data:text/calendar;charset=utf8," + 
      escape("BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:") +
      utilities.time.convertForCalend(this.props.start) + 
      escape("\nDTEND:") + utilities.time.convertForCalend(this.props.end) + 
      escape("\nSUMMARY:") + this.state.session.article + 
      escape("\nDESCRIPTION:") + this.state.session.about + 
      escape("\nLOCATION:") + this.props.location +
      escape("\nEND:VEVENT\nEND:VCALENDAR")
    );
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
          <a href={this.createGoogleCalendLink()} target="_blank" rel="nofollow" 
            className="session__calendLink session__calendLink--gCal">Google Calendar</a>
          <span className="session__calendLink session__calendLink--iCal" onClick={this.createIcalLink}>iCalendar</span>
        </div>
      )
    }

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
            value={this.props.end}
            hour="numeric"
            minute="numeric" />
      )
    }
    return (
      <div key={this.state.session.article}
       className={sessionClass}>
        <div className="session__time">
          <FormattedTime
            value={this.props.start}
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
