const path = require('path')

module.exports = {
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
    fallback: {
      buffer: require.resolve('buffer'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify')
    }
  }
}
