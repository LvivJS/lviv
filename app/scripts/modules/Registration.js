var React = require('react');

var Registration = React.createClass({
  pushData:function(data) {
    // function that pushes data to database
    console.log(data)
  },
  render: function() {
    return (
      <div className="registration">
        <RegistrationForm onDataReceived={this.pushData}/>
      </div>
    )
  }
});

var RegistrationForm = React.createClass({
  getInitialState: function() {
    return ({
      name:false,
      email:false,
      password:false
    })
  },
  handleSubmit: function(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.props.onDataReceived(this.isValid())
      console.log(this.isValid());
    };
  },
  nameIsValid: function(name) {
    this.setState(name);
  },
  emailIsValid: function(email) {
    this.setState(email);
  },
  passwordIsValid: function(password) {
    this.setState(password);
  },
  isValid: function() {
    if (this.state.name && this.state.email && this.state.password) {
      return {
        name: this.state.name,
        email: this.state.email,
        password : this.state.password
      }
    } else {return false}
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <NameInput valueReceived={this.nameIsValid}/>
        <EmailInput valueReceived={this.emailIsValid}/>
        <PasswordInput valueReceived={this.passwordIsValid}/>
        <div className="registration__field">
          <input type="submit" className="registration__submit" value="Register"/>
        </div>
      </form>
    );
  }
});

var NameInput = React.createClass({
  getInitialState: function() {
    return {
      value: false
    }
  },
  handleChange: function() {
    var value = this.refs.userName.getDOMNode().value;
    if (value == 'pill') {
      this.setState({
        name: value
      });
      this.props.valueReceived({name:value})
    }
  },
  render: function() {
    return (
      <div className="registration__field">
        <input onChange={this.handleChange} className="registration__input registration__input--transition" type="text" ref="userName" placeholder="User Name"/>
        <span className="registration--error">this field it required</span>
      </div>
    )
  }
});
var EmailInput = React.createClass({
  getInitialState: function() {
    return {
      value: false
    }
  },
  handleChange: function() {
    var value = this.refs.email.getDOMNode().value;
    if (value == 'hello') {
      this.setState({
        email: value
      });
      this.props.valueReceived({email:value})
    }
  },
  render: function() {
    return (
      <div className="registration__field">
        <input onChange={this.handleChange} className="registration__input registration__input--transition" type="text"  ref="email" placeholder="Email Address"/>
        <span className="registration--error">this field it required</span>
      </div>
    )
  }
});
var PasswordInput = React.createClass({
  getInitialState: function() {
    return {
      value: false
    }
  },
  handleChange: function() {
    var value = this.refs.password.getDOMNode().value;
    if (value == '123') {
      this.setState({
        password: value
      });
      this.props.valueReceived({password:value})
    }

  },
  render: function() {
    return (
      <div className="registration__field">
        <input onChange={this.handleChange} className="registration__input registration__input--transition" type="password"  ref="password" placeholder="Password"/>
        <span className="registration--error">this field it required</span>
      </div>
    )
  }
});

module.exports = Registration;
