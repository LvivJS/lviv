var React = require('react');

var Registration = React.createClass({
  getInitialState: function() {
    return {
      submitted: null
    }
  },
  handleSubmit: function() {
    if (this.refs.registration.isValid()) {
      this.setState({submitted: this.refs.registration.getFormData()})
    };
    console.log(this.refs.registration.isValid());
  },
  render: function() {
    return (<div className="registration">
      <RegistrationForm ref="registration"/>
      <div className="registration__field">
          <input type="submit" onClick={this.handleSubmit} className="registration__submit" value="Register"/>
      </div>
    </div>
    )
  }
});

var RegistrationForm = React.createClass({
  getInitialState: function() {
    return {
      errors: null
    }
  },
  isValid: function() {
    var fields = ['userName', 'email', 'password'];
    var errors = {};
    fields.forEach(function(field) {
      var value = this.refs[field].getDOMNode().value
      if (!value) {
        errors[field] = 'This field is required';
      }
      // var nextEl = this.refs[field].getDOMNode().nextElementSibling;
      // nextEl.className = "registration--error";
    }.bind(this));
    this.setState({errors: errors});

    var isValid = true
    for (var error in errors) {
      isValid = false
      break
    }
    return isValid
  },
   getFormData: function() {
    var data = {
      usertName: this.refs.userName.getDOMNode().value,
      email: this.refs.email.getDOMNode().value,
      password: this.refs.password.getDOMNode().value
    }
    return data
  },
  render: function() {
    console.log(this.state.errors);
    return (
      <div>
        <div className="registration__field">
            <input className="registration__input registration__input--transition" type="text" ref="userName" placeholder="User Name"/>
        </div>

        <span className="registration--error">this field it required</span>
        <div className="registration__field">
            <input className="registration__input registration__input--transition" type="text"  ref="email" placeholder="Email Address"/>
        </div>

        <span className="registration--error">this field it required</span>
        <div className="registration__field">
            <input className="registration__input registration__input--transition" type="password"  ref="password" placeholder="Password"/>
        </div>

        <span className="registration--error">this field it required</span>
      </div>
    );
  }
});

module.exports = Registration;
