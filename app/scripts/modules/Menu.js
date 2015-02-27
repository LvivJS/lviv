var React = require('react');

var Menu = React.createClass({
	render: function() {
		return (
			<div className="menu">
				<ul>
					<li className="menu__item"><a href="#overview">Overview</a></li>
					<li className="menu__item"><a href="#speakers">Speakers</a></li>
					<li className="menu__item"><a href="#shedule">Shedule</a></li>
					<li className="menu__item"><a href="#location">Location</a></li>
					<li className="menu__item"><a href="#registration">Registration</a></li>
				</ul>
			</div>
		);
	}
});

module.exports = Menu;
