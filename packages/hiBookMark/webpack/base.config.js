const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const path = require('path');
const projectBaseDir = process.cwd();

module.exports = (env, argv) => {
  return {
    entry: ['./src/index.tsx'],
    output: {
      filename: 'bundle.js',
      path: path.resolve(projectBaseDir, 'dist'),
      publicPath: '/'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json', '.scss', '.svg']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader'
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          include: /src/,
          use: ['css-modules-typescript-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(png|jpg|gif|woff2?)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
        chunkFilename: '[id].[hash].css'
      })
    ]
  };
};
