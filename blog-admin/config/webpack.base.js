const path = require('path');
const Webpack = require('webpack');

module.export = {
  entry: {
    app: ['react-hot-loader/patch','../src/index.js'],
    verder: ['react', 'react-dom', 'react-router-dom'],
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      
    ]
  }
}