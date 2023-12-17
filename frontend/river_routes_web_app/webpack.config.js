const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlTagsPlugin = require("html-webpack-tags-plugin");
module.exports = {
  mode: "development",
  externals: {
    cesium: "Cesium",
  },
  entry: ["./src/index.tsx"],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      // {
      //   test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
      //   type: "asset",
      //   use: ["url-loader"],
      // },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset",
      },
      //   use: ["url-loader"],
      //   // use: [
      //   //   {
      //   //     loader: "file-loader",
      //   //     options: {
      //   //       name: "[name].[ext]",
      //   //     },
      //   //   },
      //   // ],
      //
      //   // test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   // type: 'asset/resource',
      // },
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
    new webpack.DefinePlugin({
      CESIUM_BASE_URL: JSON.stringify("/cesium"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "node_modules/cesium/Build/Cesium",
          to: "cesium",
        },
      ],
    }),
    new HtmlTagsPlugin({
      append: false,
      tags: ["cesium/Widgets/widgets.css", "cesium/Cesium.js"],
    }),
  ],

  devServer: {
    static: path.resolve(__dirname, "dist"),
    hot: true,
    historyApiFallback: true,
  },
};
