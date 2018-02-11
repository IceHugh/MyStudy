const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');

module.exports = {
  entry: {
    app: ['react-hot-loader/patch','./src/index.js'],
    verder: ['react', 'react-dom', 'react-hot-loader', 'react-router-dom'],
  },
  output: {
    filename: '[name].[hash:4].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8000,
    hot: true
  },
  module: {
    rules: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015'],
            plugins: [
              'react-hot-loader/babel',
              'transform-class-properties',
            ]
          }
        }]
      },
      {
        test: /\.(sass|scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: [require('autoprefixer')]
          }
        }]
      },
      {
        test: /\.(png|jpe?g|git)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '13231',
      filename: 'index.html',
      template: 'src/index.html',
      minify: {
        html5: true,
      },
      hash: true,
      cache: true
    }),
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.optimize.CommonsChunkPlugin({
      name: ['vender'],
      // filename: 'vender.[hash:4].bundle.js',
      minChunks: Infinity,
      minSize: 1024,
      async: true
    })
  ]
}