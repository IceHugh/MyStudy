const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const env = process.env.NODE_ENV === 'product' ? 'product' : 'test';
const publicPaths = {
  test: '',
  production: '/'
}

module.exports = {
  entry: {
    app: ['./src/index.js'],
    verder: ['react', 'react-dom', 'react-hot-loader', 'react-router-dom'],
  },
  output: {
    filename: '[id].[chunkHash:4].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: publicPaths[env]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, 'src/module')],
        use: ['bundle-loader?lazy']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015'],
            plugins: [
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
          },
          {
            loader: 'image-webpack-loader',
            options: {
              progressive: true,
              nterlaced: true,
              pngquant: {
                quality: '65-90',
                speed: 4
              }
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
    new Webpack.optimize.CommonsChunkPlugin({
      name: ['vender'],
      // filename: 'vender.[hash:4].bundle.js',
      minChunks: Infinity,
      minSize: 1024,
      async: true
    }),
    new ExtractTextPlugin('app.css'),
    new Webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
    new StatsPlugin('webpack.stats.json',{
      source: false,
      module: true
    }),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': process.env.NODE_ENV || 'test'
    })
  ]
}