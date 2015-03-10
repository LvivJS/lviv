var React = require('react');

var Registration = React.createClass({
  render: function() {
    return (
      <form className="registration" role="form" onChange={this.handleChange}>
        <div>
          <div>
            <input className="registration__input" type="text" name="fName" ref="firstName" placeholder="First Name"/>
          </div>
        </div>
        <div>
          <div>
            <input className="registration__input" type="text" name="lName" ref="lastName" placeholder="Last Name"/>
          </div>
        </div>
        <div>
          <div>
            <input className="registration__input" type="text" name="email" ref="email" placeholder="Email Address"/>
          </div>
        </div>
        <div>
          <div>
            <input className="registration__input" type="password" name="password" ref="password" value="" placeholder="Password"/>
          </div>
        </div>
        <div>
          <div className="item-cont">
            <input className="registration__input" type="password" name="confirmPassword" ref="confPassword" value="" placeholder="Confirm Password"/>
          </div>
        </div>
        <div className="submit">
          <input type="submit" value="Register"/>
        </div>
      </form>
    );
  }
});

module.exports = Registration;
