const Webpack = require('webpack');
const pordWebpackConfig = require('../config/webpack.prod');
const ora = require('ora');
const path = require('path');
const trash = require('trash');
const spinner = ora('building for production...')
spinner.start()

trash([path.resolve(__dirname, '../dist')]).then(() => {
  Webpack(pordWebpackConfig, (err, stats) => {
    spinner.stop()
  });
});