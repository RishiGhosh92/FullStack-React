var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const publicPath = path.resolve(__dirname, "public");
module.exports = {
  entry: "./src/app.js",
  output: {
    path: publicPath,
    filename: "js/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "/images/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=1024&name=fonts/[name].[ext]"
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    disableHostCheck: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
      chunkFilename: "[id].css"
    })
  ]
};
