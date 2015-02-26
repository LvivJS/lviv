/** @jsx React.DOM */
var React = require('react');

var Header = React.createClass({
	render: function() {
		return(
			<div id="header">
				<div id="logo"><img src="./images/logo.jpg"/></div>
				<div id="menu">
					<ul>
						<li><a href="#">Register</a></li>
						<li><a href="#">Schedule</a></li>
						<li><a href="#">Reporters</a></li>
						<li><a href="#">Locating</a></li>
					</ul>
				</div>
			</div>
		);
	}
});


module.exports = Header;