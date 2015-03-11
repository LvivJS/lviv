var React = require('react');

var Registration = React.createClass({
  render: function() {
    return (
      <form className="registration" role="form" onChange={this.handleChange}>
        <div>
            <input className="registration__input registration__input--transition" type="text" name="fName" ref="firstName" placeholder="User Name"/>
        </div>
        <div>
            <input className="registration__input registration__input--transition" type="text" name="email" ref="email" placeholder="Email Address"/>
        </div>
        <div>
            <input className="registration__input registration__input--transition" type="password" name="password" ref="password" value="" placeholder="Password"/>
        </div>
        <div className="submit">
          <input type="submit" value="Register"/>
        </div>
      </form>
    );
  }
});

module.exports = Registration;
