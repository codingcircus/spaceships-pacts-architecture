const fetch = require('node-fetch');
const config = require('config');

async function getSpaceships(req, res, next) {
  const result = await fetch(`${config.services.spaceships}/spaceships`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  req.getSpaceshipsResult = await result.json();

  next();
}

module.exports = {
  getSpaceships,
}