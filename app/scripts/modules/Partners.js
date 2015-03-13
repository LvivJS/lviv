'use strict';

var React = require('react');
var config = require('../config');
var utilities = require('../utilities');

var Partners = React.createClass({
  componentDidMount: function() {
    utilities.ajax('get', config.path.partners, function(data) {
      this.setState({categories: JSON.parse(data)});
    }.bind(this));
  },

  getInitialState: function() {
    return {
      categories: []
    }
  },

  render: function() {
    var categoriesToRender = this.state.categories.map(function(data) {
      return <PartnerCategory key={data.title} category={data} />
    });
    return (
      <div className="partners">
        { categoriesToRender }
      </div>
    );
  }
});

var PartnerCategory = React.createClass({
  render: function() {
    return (
      <section className="partners__category">
      <h3 className="partners__category-header">{this.props.category.title}</h3>
          <PartnerLink array={this.props.category.data} />
      </section>
    );
  }
});

var PartnerLink = React.createClass({
  render: function() {
    var link = this.props.array.map(function(item) {
      return (
      	<a href={item.link} title={item.title} className="partners__item-link" key={item.title} target="_blank">
          <img src={item.img} alt={item.title} />
        </a>
      );
    });
    return (
      <div className="partners__items">
        { link }
      </div>
    );
  }
});

module.exports = Partners;
