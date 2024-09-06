const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/main.ts',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 9000,
      hot: true,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'assets', to: 'assets' }
        ],
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
    ],
    mode: isProduction ? 'production' : 'development',
  };
};
