'use strict';

var React = require('react');

var InputField = React.createClass({
  getInitialState: function() {
    return {
      value:  true,
      errorMessageIsShown: false
    }
  },
  isValid: function(){
    var regExp = this.props.regExp;
    var value = this.refs.data.getDOMNode().value;
    return regExp.test(value);
  },
  handleChange: function() {
    var value = this.refs.data.getDOMNode().value;
    var isValid = this.isValid();
    var prop = isValid ? value : false;
    this.setState({value: prop});
    this.props.valueReceived({name: this.props.type, value: prop}); 
  },
  componentWillReceiveProps: function(props) {
    if (props.clear) {
      this.refs.data.getDOMNode().value = '';
    };
    if (props.tipIsShown) {
      this.setState({errorMessageIsShown: !this.isValid()});
    }
  },
  render: function() {
    var inputClass = 'registration__input ';
    if (!this.state.value /*|| this.props.tipIsShown*/) {
      inputClass += 'registration__input--invalid'
    };
    var spanClass = 'registration__tip ';
    if (!this.state.errorMessageIsShown) {
      spanClass += 'invisible'
    }
    return (
      <div className="registration__field">
        <input onChange={this.handleChange} className={inputClass} type="text" ref="data" 
          placeholder={this.props.placeholder}/>
        <span className={spanClass}>{this.props.errorMessage}</span>
      </div>
    )
  }
});

module.exports = InputField;