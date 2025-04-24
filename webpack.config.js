const path = require('path');

module.exports = {
  // other webpack configurations
  resolve: {
    fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "url": require.resolve("url/"),
      "stream": require.resolve("stream-browserify"),
      "assert": require.resolve("assert/"),
    },
  },
};
