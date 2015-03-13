var React = require('react');
var Firebase = require('firebase');

var Registration = React.createClass({
  pushData:function(data) {
    var ref = new Firebase('https://blistering-fire-6843.firebaseio.com/users');
    ref.push(data);
    alert('You succesfully registered!');
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
      phone:false,
      nameTipIsShown:false,
      emailTipIsShown:false,
      phoneTipIsShown:false,
      clear:false
    })
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.checkData();
    if (this.isValid()) {
      this.props.onDataReceived(this.isValid());
      this.clearForm();
    };
  },
  checkData: function() {
    if (!this.state.name) {
      this.setState({nameTipIsShown: true});
    };
    if (!this.state.email) {
      this.setState({emailTipIsShown: true});
    };
    if (!this.state.phone) {
      this.setState({phoneTipIsShown: true});
    };
  },
  nameIsValid: function(name) {
    if (name) {
      this.setState({name:name, nameTipIsShown: false});
    };
  },
  emailIsValid: function(email) {
    if (email) {
      this.setState({email:email, emailTipIsShown: false});
    };
  },
  phoneIsValid: function(phone) {
    if (phone) {
      this.setState({phone: phone, phoneTipIsShown: false});
    };
  },
  isValid: function() {
    if (this.state.name && this.state.email && this.state.phone) {
      return {
        name: this.state.name,
        email: this.state.email,
        phone : this.state.phone
      }
    } else {
      return false
    };
  },
  clearForm: function() {
    this.setState({clear:true});
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <NameInput valueReceived={this.nameIsValid} tipIsShown={this.state.nameTipIsShown} clear={this.state.clear}/>
        <EmailInput valueReceived={this.emailIsValid} tipIsShown={this.state.emailTipIsShown} clear={this.state.clear}/>
        <PhoneInput valueReceived={this.phoneIsValid} tipIsShown={this.state.phoneTipIsShown} clear={this.state.clear}/>
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
      name:  true
    }
  },
  handleChange: function() {
    var regExp = /^[a-zA-Z_ -]{3,50}$/;
    var value = this.refs.userName.getDOMNode().value;
    if (regExp.test(value)) {
      this.setState({name: value});
      this.props.valueReceived(value)
    } else {
      this.setState({name: false});
      this.props.valueReceived(false);
    }
  },
  componentWillReceiveProps:function(props) {
    if (props.clear) {
      this.refs.userName.getDOMNode().value = '';
    };
  },
  render: function() {
    var inputClass = 'registration__input ';
    if (!this.state.name || this.props.tipIsShown) {
      inputClass += 'registration__input--invalid'
    };
    var spanClass = 'registration__tip ';
    if (!this.props.tipIsShown) {
      spanClass += 'invisible'
    }
    return (
      <div className="registration__field">
        <input onChange={this.handleChange} className={inputClass} type="text" ref="userName" placeholder="User Name"/>
        <span className={spanClass}>Name should have at least 3 characters, but no more than 16</span>
      </div>
    )
  }
});

var EmailInput = React.createClass({
  getInitialState: function() {
    return {
      email: true
    }
  },
  handleChange: function() {
    var regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*([,;]\s*\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)*/;
    var value = this.refs.email.getDOMNode().value;
    if (regExp.test(value)) {
      this.setState({email: value});
      this.props.valueReceived(value)
    } else {
      this.setState({email: false});
      this.props.valueReceived(false);
    }
  },
  componentWillReceiveProps:function(props) {
    if (props.clear) {
      this.refs.email.getDOMNode().value = '';
    };
  },
  render: function() {
    var inputClass = 'registration__input ';
    if (!this.state.email || this.props.tipIsShown) {
      inputClass += 'registration__input--invalid'
    };
    var spanClass = 'registration__tip ';
    if (!this.props.tipIsShown) {
      spanClass += 'invisible'
    }
    return (
      <div className="registration__field">
        <input onChange={this.handleChange} className={inputClass} type="text"  ref="email" placeholder="Email Address"/>
        <span className={spanClass}>Please, enter valid email</span>
      </div>
    )
  }
});

var PhoneInput = React.createClass({
  getInitialState: function() {
    return {
      phone: true
    }
  },
  handleChange: function() {
    var regExp = /^([0-9\(\)\/\+ \-]*)$/;
    var value = this.refs.phone.getDOMNode().value;
    if (regExp.test(value)) {
      this.setState({phone:value});
      this.props.valueReceived(value)
    } else {
      this.setState({phone: false});
      this.props.valueReceived(false);
    }
  },
  componentWillReceiveProps:function(props) {
    if (props.clear) {
      this.refs.phone.getDOMNode().value = '';
    }
  },
  render: function() {
    var inputClass = 'registration__input ';
    if (!this.state.phone || this.props.tipIsShown) {
      inputClass += 'registration__input--invalid'
    };
    var spanClass = 'registration__tip ';
    if (!this.props.tipIsShown) {
      spanClass += 'invisible'
    }
    return (
      <div className="registration__field">
        <input onChange={this.handleChange} className={inputClass} type="phone"  ref="phone" placeholder="Phone"/>
        <span className={spanClass}>Phone must have at least 4 numeric digit.</span>
      </div>
    )
  }
});

module.exports = Registration;
