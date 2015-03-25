'use strict';

var React = require('react');
var config = require('../config');
var utilities = require('../utilities');

var Partners = React.createClass({
  componentDidMount: function() {
    utilities.ajax('get', config.path.partners, function(data) {
      var temp = JSON.parse(data);
      this.setState({
        categories: temp.data,
        header: temp.title
      });
    }.bind(this));
  },

  getInitialState: function() {
    return {
      categories: [],
      title: ''
    }
  },

  render: function() {
    var categoriesToRender = this.state.categories.map(function(data) {
      return <PartnerCategory key={data.title} category={data} />
    });
    return (
      <section id="partners" className="page-wrap">
        <h2 className="module-header">{this.state.header}</h2>
        <div className="partners">
          { categoriesToRender }
        </div>
      </section>

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
