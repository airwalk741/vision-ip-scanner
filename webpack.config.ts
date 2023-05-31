const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // entry : 번들링할 기본 js파일들 지정
  entry: ["./src/index.ts"],
  target: "node",
  // output : 번들 결과 출력위치 지정
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname + "/build"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json", "...", ".ts"],
    modules: [path.resolve(__dirname, "src"), "node_modules", "./"],
  },
  mode: "none",
  externals: {
    express: "require('express')",
    winston: 'require("winston")',
    "pg-hstore": "pg-hstore",
    axios: 'require("axios")',
    bufferutil: "bufferutil",
    "utf-8-validate": "utf-8-validate",
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: "./src/views/main.ejs",
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true,
    //   },
    // }),
  ],
};
