const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');

const common = require('./routes/common');

const app = express();

app.use(bodyParser.json());

app.use('/public', express.static('public'));
app.set('view engine', 'pug')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', common);

app.listen(config.server.port, config.server.host, () => {
  console.log(`Server started at http://${config.server.host}:${config.server.port}`);
});