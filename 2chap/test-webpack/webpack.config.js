const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "test.js",
    path: path.resolve(__dirname, "out"),
  },
};
