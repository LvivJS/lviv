var React = require('react');
var Firebase = require('firebase');
var InputField = require('../components/input.jsx');
var config = require('../config');

var inputFields = [
  {
    type:'name',
    pattern:/^[a-zA-Z_ -]{3,50}$/,
    placeholder:'Name',
    errorMessage:'Name should have at least 3 characters, but no more than 50'
  },
  {
    type:'email',
    pattern:/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*([,;]\s*\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)*/,
    placeholder:'Email',
    errorMessage:'Please, enter valid email'
  },
  {
    type:'phone',
    pattern:/^([0-9\(\)\/\+ \-]{3,20})$/,
    placeholder:'PhoneNumber',
    errorMessage:'Phone must have at least 4 numeric digit.'
  }
];

var Registration = React.createClass({
  pushData: function(data) {
    var user = data;
    var ref = new Firebase(config.firebasePath);
    ref.push(user);
    ref.once('child_added', function(snapshot) {
      var userData = snapshot.val();
      //TODO - object comparing that not depends on order
      if (JSON.stringify(userData) == JSON.stringify(user)) {
        alert('You succesfully registered!!!!');
      };
    });
  },
  render: function() {
    return (
      <section id="registration" className="page-wrap">
        <h2 className="module-header">Registration</h2>
        <div className="registration">
          <RegistrationForm onDataReceived={this.pushData}/>
        </div>
      </section>
    )
  }
});

var RegistrationForm = React.createClass({
  getInitialState: function() {
    return ({
      name:false,
      email:false,
      phone:false,
      registerButtonIsPressed: false,
      clear:false
    })
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.setState({registerButtonIsPressed:true});
    if (this.isValid()) {
      this.props.onDataReceived(this.isValid());
      this.clearForm(true);
    };
  },
  fieldIsValid: function(field) {
    var data = {};
    data[field.name] = field.value;
    this.setState(data);
  },
  isValid: function() {
    if (this.state.name && this.state.email && this.state.phone) {
      return {
        email: this.state.email,
        name: this.state.name,
        phone : this.state.phone
      }
    } else {
      return false
    };
  },
  clearForm: function(value) {
    this.setState({
      name:false,
      email:false,
      phone:false,
      registerButtonIsPressed: false,
      clear:value
    });
  },
  render: function() {
    var formInputs = inputFields.map(function(input) {
      return (
        <InputField
          type={input.type}
          valueReceived={this.fieldIsValid}
          placeholder={input.placeholder}
          tipIsShown={this.state.registerButtonIsPressed}
          clear={this.state.clear}
          unclear={this.clearForm}
          pattern={input.pattern}
          errorMessage={input.errorMessage}
          key={input.type}
          inputAbleToFill={this.clearForm}/>
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
