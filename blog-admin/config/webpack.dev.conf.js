const Webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('../config/webpack.base.conf');

module.exports = merge(baseWebpackConfig, {
  devtool: 'source-map',
  plugins: [
    // new Webpack.HotModuleReplacementPlugin(),
  ]
});