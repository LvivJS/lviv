'use strict';

var React = require('react');

var Footer = React.createClass({
	render: function() {
    return (
      <div className="footer">
      	<div className="footer__partners-wrap">
      		<h3 className="footer__partners-header">Golden</h3>
      		<div className="footer__partners-items">
      			<a href="#" tittle="partner" className="footer__partner-link"></a>
      			<a href="#" tittle="partner" className="footer__partner-link"></a>
      			<a href="#" tittle="partner" className="footer__partner-link"></a>
      			<a href="#" tittle="partner" className="footer__partner-link"></a>
      			<a href="#" tittle="partner" className="footer__partner-link"></a>
      		</div>
      	</div>
      	<div className="footer__partners-wrap">
      		<h3 className="footer__partners-header">Silver</h3>
      		<div className="footer__partners-items"> 
	      		<a href="#" tittle="partner" className="footer__partner-link"></a>
	      		<a href="#" tittle="partner" className="footer__partner-link"></a>
	      		<a href="#" tittle="partner" className="footer__partner-link"></a>
	      		<a href="#" tittle="partner" className="footer__partner-link"></a>
	      		<a href="#" tittle="partner" className="footer__partner-link"></a>     			
      		</div>
      	</div>
      	<div className="footer__partners-wrap">
      		<h3 className="footer__partners-header">Bronze</h3>
      		<div className="footer__partners-items">  
      			<a href="#" tittle="partner" className="footer__partner-link"></a>
      			<a href="#" tittle="partner" className="footer__partner-link"></a>
      			<a href="#" tittle="partner" className="footer__partner-link"></a>
      			<a href="#" tittle="partner" className="footer__partner-link"></a>
      			<a href="#" tittle="partner" className="footer__partner-link"></a>
      			<a href="#" tittle="partner" className="footer__partner-link"></a>
      			<a href="#" tittle="partner" className="footer__partner-link"></a>
      			<a href="#" tittle="partner" className="footer__partner-link"></a>
      			<a href="#" tittle="partner" className="footer__partner-link"></a>
      			<a href="#" tittle="partner" className="footer__partner-link"></a>    			
      		</div>
      	</div>
      	<div className="footer__partners-wrap">
      		<h3 className="footer__organizers-header">Organizers</h3>
      		<div className="footer__partners-items">  
      			<a href="#" tittle="partner" className="footer__partner-link"></a>
      			<a href="#" tittle="partner" className="footer__partner-link"></a>
      			<a href="#" tittle="partner" className="footer__partner-link"></a>
      			<a href="#" tittle="partner" className="footer__partner-link"></a>		
      		</div>
      	</div>

      </div>
    );
  }
});

module.exports = Footer;
