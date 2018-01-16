const Webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const baseWebpackConfig = require('../config/webpack.base.conf');

module.exports = merge(baseWebpackConfig, {
  output: {
    publicPath: '/',
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    
    new Webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      minSize: 1024,
      async: true
    }),
    new Webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    })
  ]
})