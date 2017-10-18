const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

var entryPathJavascript = './src/js/index.js'
var entryPathSass = './src/sass/styles.scss'

module.exports = {

  entry: [
      entryPathJavascript,
      entryPathSass
    ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    hot: true
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      { from: './src/index.html' },
      { from: './src/error.html' },
      {
        from: './src/icons',
        to: 'icons'
      },
      {
        from: './src/fonts',
        to: 'fonts'
      },
      {
        from: './src/assets',
        to: 'assets'
      },
      {
        from: './src/images',
        to: 'images'
      }
    ]),

    new ExtractTextPlugin('style.bundle.css'),

    new webpack.ProvidePlugin({
      jquery: 'jquery',
      $: 'jquery',
      jQuery: 'jquery'
    }),

    new webpack.ProvidePlugin({
      lodash: 'lodash',
      _: 'lodash'
    })
  ],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      { test: /\.(css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }]
        })
      },
      { test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      { test: /(fonts).*(woff|woff2?|ttf|eot|svg|otf|png)$/,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 10000,
            name: 'fonts/[name].[ext]'
          }
        }]
      },
      { test: /(icons).*(woff|woff2?|ttf|eot|svg|otf|png)$/,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 10000,
            name: 'icons/[name].[ext]'
          }
        }]
      },
      { test: /(images).*(woff2?|ttf|eot|svg|png|jpg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 10000,
            name: 'images/[name].[ext]'
          }
        }]
      },
      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: '$'
        }]
      },
      {
        test: require.resolve('lodash'),
        use: [{
          loader: 'expose-loader',
          options: '_'
        }]
      }
    ]
  }
};
