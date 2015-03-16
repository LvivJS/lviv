var React = require('react');
var Firebase = require('firebase');
var InputField = require('../components/input.jsx');

var inputFields = [
      {
        type:'name',
        regExp:/^[a-zA-Z_ -]{3,50}$/,
        placeholder:'Name',
        errorMessage:'Name should have at least 3 characters, but no more than 50'
      },
      {
        type:'email',
        regExp:/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*([,;]\s*\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)*/,
        placeholder:'Email',
        errorMessage:'Please, enter valid email'
      },
      {
        type:'phone',
        regExp:/^([0-9\(\)\/\+ \-]*)$/,
        placeholder:'Phone Number',
        errorMessage:'Phone must have at least 4 numeric digit.'
      }
];

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
      errorMessagesAreShown: false,
      clear:false
    })
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.checkData();
    if (this.isValid()) {
      this.props.onDataReceived(this.isValid());
      this.clearForm(false);
    };
  },
  checkData: function() {
    this.setState({errorMessagesAreShown: !this.isValid()})
  },
  fieldIsValid: function(field) {
    var data = {};
    if (field.value) {
      data[field.name] = field.value;
      data.errorMessagesAreShown = false;
      this.setState(data);
    }
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
  clearForm: function(value) {
    this.setState({clear:!value});
  },
  render: function() {
    var formInputs = inputFields.map(function(input) {
      return (
          <InputField valueReceived={this.fieldIsValid} tipIsShown={this.state.errorMessagesAreShown} 
            clear={this.state.clear} type={input.type} regExp={input.regExp} placeholder={input.placeholder} 
            errorMessage={input.errorMessage} key={input.type} inputAbleToFill={this.clearForm}/>
        )
    }.bind(this));

    return (
      <form onSubmit={this.handleSubmit}>
        {formInputs}
        <div className="registration__field">
          <input type="submit" className="registration__submit" value="Register"/>
        </div>
      </form>
    );
  }
});

module.exports = Registration;
