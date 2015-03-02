'use strict';

var React = require('react');

var Footer = React.createClass({
	render: function() {
    return (
      <div className="footer">
      	<div className="footer--partners-wrap">
      		<h3 className="footer--partners-header">Golden</h3>
      		<div className="footer--partners-items">
      		</div>
      	</div>
      	<div className="footer--partners-wrap">
      		<h3 className="footer--partners-header">Silwer</h3>
      		<div className="footer--partners-items">      			
      		</div>
      	</div>
      	<div className="footer--partners-wrap">
      		<h3 className="footer--partners-header">Bronze</h3>
      		<div className="footer--partners-items">      			
      		</div>
      	</div>
      </div>
    );
  }
});

module.exports = Footer;
