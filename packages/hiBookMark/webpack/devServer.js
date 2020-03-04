const path = require('path');
const fs = require('fs');
module.exports = function(option = {}) {
  let config = {
    disableHostCheck: true,
    historyApiFallback: {
      disableDotRule: true
    },
    contentBase: path.join(option.projectBaseDir, 'dist'),
    compress: true,
    port: option.port || 4200,
    host: option.host || '0.0.0.0'
  };
  return config;
};
