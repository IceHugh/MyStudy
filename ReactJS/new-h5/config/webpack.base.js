const path = require('path');
const Webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: ['babel-polyfill','react-hot-loader/patch', path.resolve(__dirname, '../src/index')],
    verder: ['react', 'react-dom', 'react-router-dom'],
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  target: 'web',
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css", ".styl"],
    alias: {},
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, '../src')],
        loader: 'babel-loader',
      },
      {
        test: /\.styl/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            'stylus-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    // new ExtractTextPlugin('app.css'),
    new HtmlWebpackPlugin({
      title: '慧眼',
      template: './src/index.html',
      minify: {
        html5: true,
      },
      hash: true,
      cache: true
    }),
  ]
}