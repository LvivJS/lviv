'use strict';

var React = require('react');
var classNames = require('classnames');

var InputField = React.createClass({
  getInitialState: function() {
    return {
      value:  null,
      errorMessageIsShown: false,
      inputInvalid: false,
      madeFirstBlur: false
    }
  },
  inputValue: function() {
    var value = this.refs.data.getDOMNode().value;
    return value
  },
  isValid: function() {
    var pattern = this.props.pattern;
    var value = this.inputValue();
    return pattern.test(value);
  },
  madeFirstBlur: function() {
    if (this.inputValue()) {
      this.setState({madeFirstBlur:true});
      this.handleChange();
    }
  },
  handleChange: function() {
      var value = this.inputValue();
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
      this.setState({errorMessageIsShown: !this.isValid(), inputInvalid: !this.isValid(), madeFirstBlur: true});
    }
  },
  render: function() {
    var spanClass = classNames({
        'registration__tip': true,
        'invisible': !this.state.errorMessageIsShown
      });
    var inputClass = classNames({
        'registration__input': true,
        'registration__input--invalid': this.state.inputInvalid
      });
    var shouldCheck = this.state.madeFirstBlur ? this.handleChange : null;
    var inputId = 'cm_' + this.props.placeholder;
    return (
      <div className="registration__field">
        <label htmlFor={inputId}>{this.props.placeholder == 'tel' ? 'Phone' : this.props.placeholder}</label>
        <input id={inputId} onChange={shouldCheck} onBlur={this.madeFirstBlur} className={inputClass} type="text" ref="data" />
        <span className={spanClass}>{this.props.errorMessage}</span>
      </div>
    )
  }
});

module.exports = InputField;
