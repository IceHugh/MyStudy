
'use strict';

const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const devWebpackConfig = require('../config/webpack.dev');

const compiler = Webpack(devWebpackConfig);
const devServerOptions = Object.assign({}, devWebpackConfig.devServer, {
  stats: {
    colors: true
  }
});
const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(8090, '127.0.0.1', () => {
  console.log('Starting server on http://localhost:8080');
});