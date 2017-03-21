'use strict'

const webpack       = require('webpack')
const nodeExternals = require('webpack-node-externals')
const paths         = require('./paths')
const ENV           = process.env.NODE_ENV

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: paths.serverEntry,
  output: {
    path: paths.build,
    filename: 'renderHandler.js',
    publicPath: paths.publicUrl,
    libraryTarget: 'commonjs2'
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
              targets: { node: 'current' },
              modules: false,
              useBuiltIns: true
            }],
            'react'
          ],
          plugins: [
            ["transform-object-rest-spread", { useBuiltIns: true }]
          ]
        }
      },
      {
        test: /\.css$/,
        include: paths.src,
        loader: 'css-loader/locals',
        options: {
          modules: true,
          localIdentName: '[path][name]-[local]-[hash:base64:5]'
        }
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'media/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV),
      __CLIENT__: false,
      __SERVER__: true
    })
  ]
}
