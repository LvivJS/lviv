'use strict';

var React = require('react');
var config = require('../config');

var Schedule = React.createClass({
  getInitialState: function() {
    return {
      conferences:[]
    }
  },
  componentDidMount: function() {
    var getData = function(data) {
      this.setState({conferences:JSON.parse(data)})
    }.bind(this);
    config.request('get', config.path.schedule, getData)
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
      activeTable:this.props.days[0],
      activeDay:this.props.days[0].day_id,
      confIsVisible:true
    }
  },
  ChangeTab: function(day) {
    this.setState({
      activeTable:day,
      activeDay: day.day_id
    });
  },
  ChangeConfRepresent: function() {
    this.state.confIsVisible ? this.setState({confIsVisible:false}) : this.setState({confIsVisible:true});
  },
  render: function() {
    var days = this.props.days.map(function(day) {
      return (
        <li onClick={this.ChangeTab.bind(null, day)} key={day.day_id} 
          className={(this.state.activeDay==day.day_id)?"conference__tab--active":null}>
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
          <input type="button" onClick={this.ChangeConfRepresent} 
            className={this.state.confIsVisible ? "up-arrow" : "down-arrow"}/>
        </div>
        {this.state.confIsVisible ? <ul>{days}</ul> : null}
        {timetable}
      </div>
    );
  }
});

var Timetable = React.createClass({
  getInitialState:function() {
    return {
      sessions:this.props.sessions
    }
  },
  render: function() {
    var sessions = this.state.sessions.map(function(session) {
      return <Session key={session.article} session={session} />
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
      session:this.props.session,
      isHided:false,
      isReport: this.props.session.type == 'report'
    }
  },
  ChangeAbout: function() {
    this.state.isHided ? this.setState({isHided:false}) : this.setState({isHided:true});
  },
  render: function() {
    return (
      <div key={this.state.session.article}
       className={this.state.isReport ? "session session--report" : "session session--entertainment"}>
        <div className="session__time">{this.state.session.time}</div>
        <div className="session__arrangement">
          <h4 className="session__name">{this.state.session.article}</h4>
          <div className={this.state.isReport ? "session__info" : "session__info session__info--right"}>
            {
              this.state.isReport ?
              <span className="speaker__name">
                {this.state.session.speaker.name}{this.state.session.speaker.position}
              </span>:null
            }
            {
              this.state.session.about ?
              <span onClick={this.ChangeAbout.bind(null,this.state.session)} 
                className= {this.state.isHided ? 
                "session__button  session__button--inactive" : "session__button  session__button--active"}>
              </span>:null
            }
          </div>
          <div className={this.state.isHided ? 
            "session__about invisible" : "session__about"}>
              {this.state.session.about}
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Schedule;
