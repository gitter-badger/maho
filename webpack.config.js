webpack = require('webpack');

module.exports = {
  entry: {
    'maho': './source/main.ts',
    'tests': './test/tests.ts'
  },
  output: {
    path: 'dist',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.ts', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.ts$/,
        loader: "tslint"
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  tslint: {
    configuration: {
      rules: {
        quotemark: [true, "single"]
      }
    },
    emitErrors: false,
    failOnHint: false
  }
}
