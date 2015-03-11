var React = require('react');

var Registration = React.createClass({
   propTypes: {
    firstName: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <form className="registration" role="form" onChange={this.handleChange}>
        <div className="registration__fields">
            <input className="registration__input registration__input--transition" type="text" value={this.props.firstName} ref="firstName" placeholder="User Name"/>
        </div>
        <div className="registration__fields">
            <input className="registration__input registration__input--transition" type="text" name="email" ref="email" placeholder="Email Address"/>
        </div>
        <div className="registration__fields">
            <input className="registration__input registration__input--transition" type="password" name="password" ref="password" value="" placeholder="Password"/>
        </div>
        <div className="registration__fields">
          <input type="submit" className="registration_submit" value="Register"/>
        </div>
      </form>
    );
  }
});

module.exports = Registration;
