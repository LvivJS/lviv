'use strict';

var React = require('react');

var Schedule = React.createClass({
  getInitialState: function() {
    return {
      conferences:[]
    }
  },
  componentDidMount: function() {
    var req = new XMLHttpRequest();
    req.open('get', './dev/json/schedule.json', true);
    req.onreadystatechange = function() {
      this.setState({conferences:JSON.parse(req.responseText)})
    }.bind(this);
    req.send();
  },
  render: function() {
    var conferences = this.state.conferences.map(function(conference) {
      console.log(conference);
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
  getInitialState:function() {
    return {
      active:" "
    }
  },
  ChangeTab:function() {
    this.refs.
  },
  componentDidMount: function() {
    // var .getFirstChildWithTagName()
  },
  render: function() {
    console.log(this.props.days);
    var days = this.props.days.map(function(day) {
      return <li><span ref={day.day_id}/*onClick={this.ChangeTab}*/>{day.day_name}</span></li>
    });
    var timetables = this.props.days.map(function(day) {
      // if (day.day_id == this.state.active) {
        return <Timetable sessions={day.timetable}/>
      // }
    });
    return (
      <div className="conference">
        <h3>Shedule: {this.props.name}</h3>
        <ul>{days}</ul>
        {timetables }
      </div>
    );
  }
});

var Timetable = React.createClass({
  render: function() {
    var sessions = this.props.sessions.map(function(session) {
      return (
        <div className="session">
        <div className="session__time">{session.time}</div>
          <div className="session__arrangement">
            <h4 className="session__arrangement--name">{session.article}</h4>
            <div className="session__arrangement--speaker">
              <span className="speaker__name">{session.speaker.name}</span>
              <span className="speaker__pos">{session.speaker.position}</span>
            </div>
            <div className="session__arrangement--about">{session.about}</div>
          </div>
        </div>
      )
    });
    return (
      <div className="timetable">
        {sessions}
      </div>
    );
  }
});

module.exports = Schedule;
