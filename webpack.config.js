const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin, ProvidePlugin } = require('webpack')
const express = require('express')

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'dev'),
  entry: {
    main: './index.js',
    dialog: './dialog.js'
  },
  devServer: {
    host: 'localhost',
    port: 5000,
    devMiddleware: {
      publicPath: '/',
      stats: {
        preset: 'minimal',
        colors: true
      }
    },
    client: {
      logging: 'none'
    },
    onBeforeSetupMiddleware: devServer => {
      devServer.app.use(express.json())

      devServer.app.post('/rest/api/request', (request, response) => {
        const status = request.body.path === 'failure' ? 400 : 200

        response.json({
          status,
          body: request.body
        })
      })
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify')
    }
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false
          }
        },
        extractComments: false
      })
    ]
  },
  performance: {
    hints: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Fake AP',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      title: 'Dialog',
      filename: 'dialog.html',
      chunks: ['dialog']
    }),
    new DefinePlugin({
      __REACT_DEVTOOLS_GLOBAL_HOOK__: '({ isDisabled: true })'
    }),
    new ProvidePlugin({
      process: 'process/browser'
    }),
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer']
    })
  ]
}
