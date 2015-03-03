'use strict';

var React = require('react');

var Footer = React.createClass({
	render: function() {
    return (
      <div className="partners">
      	<div className="partners__wrapper">
      		<h3 className="partners__header">Golden</h3>
      		<div className="partners__items">
      			<a href="#" tittle="partner" className="partners__item-link"></a>
      		</div>
      	</div>
      	<div className="partners__wrapper">
      		<h3 className="partners__header">Silver</h3>
      		<div className="partners__items"> 
	      		<a href="#" tittle="partner" className="partners__item-link"></a>   			
      		</div>
      	</div>
      	<div className="partners__wrapper">
      		<h3 className="partners__header">Bronze</h3>
      		<div className="partners__items">  
      			<a href="#" tittle="partner" className="partners__item-link"></a>   			
      		</div>
      	</div>
      	<div className="partners__wrapper">
      		<h3 className="partners__header--organizers">Organizers</h3>
      		<div className="partners__items">  
      			<a href="#" tittle="partner" className="partners__item-link"></a>	
      		</div>
      	</div>

      </div>
    );
  }
});

module.exports = Footer;
