module.exports = {
  entry: './source/main.ts',
  output: {
    path: 'dist',
    filename: 'maho.js'
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
      { test: /\.json$/,
        loader: 'json-loader'
      }
    ],
    noParse: /node_modules\/json-schema\/lib\/validate\.js/
  },
  node: {
    console: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
