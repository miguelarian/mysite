const path = require('path');
const webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {

  entry: './src/js/index.js',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      { from: './src/index.html' },
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
      { test: /(images).*(woff2?|ttf|eot|svg|png)$/,
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
