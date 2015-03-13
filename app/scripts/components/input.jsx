'use strict';

var React = require('react');

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
