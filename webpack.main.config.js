'use strict'

process.env.BABEL_ENV = 'main'

const path = require('path')
const pkg = require('./app/package.json')
const webpack = require('webpack')
const BabiliWebpackPlugin = require('babili-webpack-plugin')
let mainConfig = {
  entry: {
    main: path.join(__dirname, 'app/src/main/index.js')
  },
  externals: Object.keys(pkg.dependencies || {}),
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.node$/,
        loader: 'node-loader'
      }
    ]
  },
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename:process.env.NODE_ENV !== 'production',
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'app/dist')
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ],
  resolve: {
    extensions: ['.js', '.json', '.node'],
    modules: [
      path.join(__dirname, 'app/node_modules')
    ]
  },
  target: 'electron-main'
}
/**
 * Adjust mainConfig for development settings
 */
/*if (process.env.NODE_ENV !== 'production') {
    mainConfig.plugins.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        })
    )
}

/!**
 * Adjust mainConfig for production settings
 *!/
if (process.env.NODE_ENV === 'production') {
    mainConfig.plugins.push(
        new BabiliWebpackPlugin({
            removeConsole: true,
            removeDebugger: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        })
    )
}*/
module.exports = mainConfig
