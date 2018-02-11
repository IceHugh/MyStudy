const Webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('../config/webpack.base');
const path = require('path');
const { publicPath } = baseWebpackConfig.output;

module.exports = merge(baseWebpackConfig, {
  devtool: 'source-map',
  devServer: {
    // contentBase: path.join(__dirname, "../dist"),
    publicPath,
    compress: true,
    port: 9000,
    open: true,
    hot: true
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
  ]
});