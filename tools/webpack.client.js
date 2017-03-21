'use strict'

const webpack           = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const paths             = require('./paths')
const ENV               = process.env.NODE_ENV

const webpackConfig = {
  devtool: 'source-map',
  entry: ['babel-polyfill', paths.clientEntry],
  output: {
    path: paths.build,
    filename: ENV === 'production' ? 'app.[hash:9].js' : 'app.js',
    publicPath: paths.publicUrl
  },
  resolve: {
    modules: ['node_modules', paths.src]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: paths.src,
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              modules: false
            }],
            'react'
          ],
          plugins: ['transform-object-rest-spread']
        }
      },
      {
        test: /\.css$/,
        include: paths.src,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]-[local]-[hash:base64:5]',
              minimize: ENV === 'production'
            }
          }
        })
      },
      {
        test: /\.css$/,
        include: paths.nodeModules,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: {
              minimize: ENV === 'production'
            }
          }
        })
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin(ENV === 'production' ? 'app.[contenthash:9].css' : 'app.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: paths.template
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV),
      __CLIENT__: true,
      __SERVER__: false
    })
  ]
}

if (ENV === 'production') {
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      screw_ie8: true,
      warnings: false
    },
    mangle: {
      screw_ie8: true
    },
    output: {
      comments: false,
      screw_ie8: true
    }
  }))
}

module.exports = webpackConfig
