const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = {
  mode: "development",
  entry: ["./src/index.tsx"],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset",
        // use: [
        //   {
        //     loader: "file-loader",
        //     options: {
        //       name: "[name].[ext]",
        //     },
        //   },
        // ],

        // test: /\.(png|svg|jpg|jpeg|gif)$/i,
        // type: 'asset/resource',
      },
      {
        test: /\.(?:js|mjs|cjs|tsx|ts|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
  watch: true,
  resolve: {
    extensions: [".*", ".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@src": path.resolve(__dirname, "src"),
    },
    fallback: {
      timers: require.resolve("timers-browserify"),
      fs: require.resolve("browserify-fs"),
      // util: false,
      // stream: false,
      // buffer: false,
      // path: false,
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: "./public/index.html", filename: "index.html", title: "Webpack App" }),
    new NodePolyfillPlugin(),
  ],

  devServer: {
    static: path.resolve(__dirname, "dist"),
    hot: true,
    historyApiFallback: true,
  },
};
