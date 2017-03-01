const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('./webpack.config');

const compiler = webpack(config);

new WebpackDevServer(compiler, config.devServer)
.listen(config.devServer.port, config.devServer.host, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at '+config.devServer.host+':' + config.devServer.port);
});