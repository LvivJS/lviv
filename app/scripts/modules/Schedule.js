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
      activeTable:this.props.days[0],
      activeDay:this.props.days[0].day_id,
      isVisible:true
    }
  },
  ChangeTab:function(day) {
    this.setState({
      activeTable:day,
      activeDay: day.day_id
    });

  },
  ChangeConfRepresent:function() {
    this.state.isVisible ? this.setState({isVisible:false}) : this.setState({isVisible:true});

  },
  // RendConference:function() {
  //   var days = this.props.days.map(function(day) {
  //     return <li onClick={this.ChangeTab.bind(null, day)} key={day.day_id}><span>{day.day_name}</span></li>
  //   }.bind(this));
  //   var timetable = this.props.days.map(function(day) {
  //     if (day.day_id == this.state.activeDay) {
  //       return <Timetable sessions={day.timetable} key={day.day_id}/>
  //     };
  //   }.bind(this));
  //     if (this.state.isVisible) {
  //       return (
  //     } else {return }
  //   }.bind(this),
  render: function() {
    var days = this.props.days.map(function(day) {
      return <li onClick={this.ChangeTab.bind(null, day)} key={day.day_id} className={(this.state.activeDay==day.day_id)?"conference__tab--active":null}><span>{day.day_name}</span></li>
    }.bind(this));
    var timetable = this.props.days.map(function(day) {
      if (day.day_id == this.state.activeDay && this.state.isVisible) {
        return <Timetable sessions={day.timetable} key={day.day_id}/>
      };}.bind(this));
    return (
      <div className="conference">
        <div className="conference__title">
          <h3>Shedule: {this.props.name}</h3>
          <input type="button" onClick={this.ChangeConfRepresent} className={this.state.isVisible ? "up-arrow" : "down-arrow"}/>
        </div>
        {this.state.isVisible ? <ul>{days}</ul> : null}
        {timetable}
      </div>
    );
  }
});

var Timetable = React.createClass({
  render: function() {
    var sessions = this.props.sessions.map(function(session) {
      return (
        <div className="session" key={session.article}>
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
