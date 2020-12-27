const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin, ProvidePlugin } = require('webpack')

const config = {
  entry: './index.js',
  output: {
    filename: 'fake-ap.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    publicPath: '/',
    port: 5000,
    stats: {
      preset: 'minimal',
      colors: true
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
      buffer: require.resolve('buffer'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify')
    }
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom'
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
  plugins: [
    new ProvidePlugin({
      process: 'process/browser'
    })
  ]
}

module.exports = (_env, argv) => {
  if (argv.mode === 'development') {
    config.entry = './dev/index.jsx'

    config.externals = {}

    config.plugins.push(new HtmlWebpackPlugin({ title: 'Fake AP' }))
    config.plugins.push(new DefinePlugin({ __REACT_DEVTOOLS_GLOBAL_HOOK__: '({ isDisabled: true })' }))
  }

  return config
}
