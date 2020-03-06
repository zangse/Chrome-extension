const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const ZipPlugin = require("zip-webpack-plugin");
const path = require("path");
const projectBaseDir = process.cwd();

module.exports = (env, argv) => {
  return {
    entry: {
      option: "./src/option/index.tsx",
      popup: "./src/popup/index.tsx"
    },
    output: {
      path: path.resolve(projectBaseDir, "dist"),
      publicPath: "./",
      filename: "[name].main.js"
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".json", ".scss", ".svg"]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader"
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          include: /src/,
          use: ["css-modules-typescript-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.(png|jpg|gif|woff2?)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "src/index.html",
        inject: "body",
        chunks: ["option"],
        hash: true,
        title: "option page",
        minify: {
          removeComments: true,
          collapseWhitespace: true
        }
      }),
      new HtmlWebpackPlugin({
        filename: "popup.html",
        template: "src/index.html",
        inject: "body",
        title: "popup page",
        chunks: ["popup"],
        hash: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true
        }
      }),
      // copy custom static assets
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, "..", "src/static/"),
          to: "static",
          ignore: [".*"]
        },
        {
          from: path.resolve(__dirname, "..", "src/manifest.json"),
          to: path.resolve(__dirname, "..", "dist/")
        },
        {
          from: path.resolve(__dirname, "..", "src/_locales/"),
          to: path.resolve(__dirname, "..", "dist/_locales")
        }
      ]),
      new MiniCssExtractPlugin({
        filename: "[name].[hash].css",
        chunkFilename: "[id].[hash].css"
      })
    ],
    optimization: {
      minimizer: [
        new UglifyJSPlugin({
          parallel: true,
          sourceMap: true,
          uglifyOptions: {
            compress: {
              drop_console: true
            }
          }
        })
      ]
    },
    devtool: "#source-map"
  };
};
