'use strict';

var React = require('react');
var utilities = require('../utilities');
var config = require('../config');

var Footer = React.createClass({
  getInitialState: function() {
    return ({
      data: '',
      locales:''
    });
  },

  componentDidMount: function() {
    utilities.ajax('get', config.path.footer, function(data) {
      var temp = JSON.parse(data);
      this.setState({
        data: temp.data,
        locales: temp.locales
      });
    }.bind(this));
  },
  render: function() {

    return (
      <footer id="footer" className="page-wrap footer">
        <div className="footer__container">
        <Connection locales={this.state.locales} />
        </div>
      </footer>
    );
  }
});


var Connection = React.createClass({
  render:function() {
    return(
      <div className="footer__block">
        <h5>{this.props.locales.connection_header}</h5>
        <div className="footer__socials">

        </div>
        <div className="footer__subscribe">
          <form>
             <span>{this.props.locales.subscribe_prop}</span>
             <input type="text" placeholder="email"/>
             <input type="button" value={this.props.locales.submit_subscribe}/>
          </form>
          <div className="footer__contacts">

          </div>
        </div>
      </div>
    )
  }
});
          

module.exports = Footer;


//           <OtherEvents data={this.state.data} locales={this.state.locales} />
 
          
// var OtherEvents = React.createClass({
//   getInitialState: function() {
//     return {
//       events:this.props.data.events
//     }
//   },
//   render: function() {
//     console.log(this.props.data.events);
//     var events = this.state.events.map(function(ev){
//       return(
//         <a href={ev.link}>{ev.name}</a>
//       )
//     }.bind(this));
//     return (
//       <div className="footer__block">
//         <h5>{this.props.locales.events_header}</h5>
//         {events}
//       </div>
//     )
//   }
// });