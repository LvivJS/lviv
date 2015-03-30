'use strict';

var React = require('react');

var SocialIcon = React.createClass({
  networkImage: function() {
    var facebook = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 155.139 155.139" className="social_icons">
        <path className="social__icon" d="M89.584 155.14V84.377h23.742l3.562-27.585H89.584v-17.61c0-7.983 2.208-13.424 13.67-13.424l14.595-.007V1.08C115.324.752 106.66 0 96.576 0 75.52 0 61.104 12.853 61.104 36.452v20.34H37.29V84.38h23.814v70.76h28.48z"/>
      </svg>
    );
    var twitter = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="social_icons">
        <path className="social__icon" d="M31.993 6.077c-1.177.523-2.44.876-3.77 1.033 1.355-.812 2.396-2.098 2.887-3.63-1.27.75-2.673 1.3-4.168 1.592C25.744 3.797 24.038 3 22.15 3c-3.626 0-6.563 2.938-6.563 6.563 0 .514.057 1.016.17 1.496C10.3 10.784 5.464 8.17 2.226 4.2c-.564.97-.888 2.098-.888 3.3 0 2.28 1.158 4.287 2.918 5.465-1.075-.035-2.087-.33-2.972-.82v.08c0 3.182 2.26 5.835 5.264 6.438-.55.15-1.13.23-1.73.23-.423 0-.833-.04-1.233-.117.834 2.606 3.26 4.504 6.13 4.558-2.245 1.76-5.075 2.81-8.15 2.81-.53 0-1.053-.03-1.566-.09C2.906 27.913 6.356 29 10.063 29c12.072 0 18.675-10 18.675-18.675 0-.284-.008-.568-.02-.85 1.283-.925 2.395-2.08 3.276-3.398z"/>
      </svg>
    );
    var linkedin = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67 67" className="social_icons">
        <path className="social__icon" d="M49.837 48.137V36.425c0-6.274-3.35-9.194-7.816-9.194-3.603 0-5.218 1.983-6.118 3.374V27.71h-6.79c.09 1.917 0 20.428 0 20.428h6.79v-11.41c0-.61.044-1.22.224-1.656.49-1.22 1.607-2.482 3.482-2.482 2.458 0 3.44 1.873 3.44 4.618v10.93h6.79zM21.96 24.922c2.366 0 3.84-1.57 3.84-3.53-.043-2.004-1.474-3.53-3.796-3.53s-3.84 1.526-3.84 3.53c0 1.96 1.473 3.53 3.752 3.53h.043zm3.394 23.215V27.71h-6.79v20.427h6.79zM3 4h60v60H3V4z" />
      </svg>
    );
    if (this.props.network == 'facebook') {
      return facebook
    } else if (this.props.network == 'twitter') {
      return twitter
    } else if (this.props.network == 'linkedin') {
      return linkedin 
    } else {
      return null
    }
  },
  render: function() {
    return (
      <span>
        {this.networkImage()}
      </span>
    )
  }
});

module.exports = SocialIcon;