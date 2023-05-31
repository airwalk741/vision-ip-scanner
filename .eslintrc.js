// module.exports = {
//   env: {
//     node: true,
//     // browser: true,
//     // commonjs: true,
//     es2021: true,
//   },
//   extends: "eslint:recommended",
//   overrides: [],
//   parserOptions: {
//     ecmaVersion: "latest",
//     sourceType: "module",
//   },
//   rules: {
//     "no-unused-vars": "off",
//   },
// };

module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["standard"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {},
};
