'use strict';

var React = require('react');

var InputField = React.createClass({
  getInitialState: function() {
    return {
      value:  null,
      errorMessageIsShown: false,
      inputInvalid:false
    }
  },
  isValid: function(){
    var pattern = this.props.pattern;
    var value = this.refs.data.getDOMNode().value;
    return pattern.test(value);
  },
  handleChange: function() {
    var value = this.refs.data.getDOMNode().value;
    var isValid = this.isValid();
    var prop = isValid ? value : false;
    this.setState({value: prop, inputInvalid: !isValid});
    if (this.props.tipIsShown) {
    	this.setState({errorMessageIsShown:!isValid})
    } 
    this.props.valueReceived({name: this.props.type, value: prop}); 
  },
  componentWillReceiveProps: function(props) {
    if (props.clear) {
      this.refs.data.getDOMNode().value = '';
      this.replaceState(this.getInitialState());
      this.props.unclear(false)
    };
    if (props.tipIsShown) {
      this.setState({errorMessageIsShown: !this.isValid(), inputInvalid: !this.isValid()});
    }
  },
  render: function() {
    var inputClass = 'registration__input ';
    if (this.state.inputInvalid) {
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