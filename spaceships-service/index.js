const config = require('config');

const server = require('./server');

server.listen(config.server.port, config.server.host, () => {
  console.log(`Server started at http://${config.server.host}:${config.server.port}`);
});