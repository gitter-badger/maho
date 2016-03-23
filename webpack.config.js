module.exports = {
  entry: "./source/main.ts",
  output: {
    path: "dist",
    filename: "maho.js"
  },
  resolve: {
    extensions: ['', '.webpack.js', '.ts', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: "ts-loader"
      }
    ]
  }
};