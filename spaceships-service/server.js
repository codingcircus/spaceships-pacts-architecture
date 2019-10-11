const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const morgan = require('morgan');

const spaceships = require('./routes/spaceships');

const server = express();

server.use(bodyParser.json());
server.use(morgan('tiny'));

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.get('/', (req, res) => {
  res.send('Welcome to the spaceship backend');
});

server.use('/spaceships', spaceships);

module.exports = server;