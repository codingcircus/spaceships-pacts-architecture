const {spaceships} = require('../../db');

function postSpaceship(req, res) {
  if (req.body.name && req.body.size && req.body.description) {
    const newSpaceship = spaceships.createItem(req.body.name, req.body.description, req.body.size);

    return res
      .status(201)
      .json(newSpaceship);
  }

  return res
    .status(400)
    .json({
      success: false,
      data: {},
      errors: [{
        message: 'INVALID_REQUEST'
      }],
    });
}

function getSpaceships(req, res) {
  return res.json(spaceships.getItems());
}

module.exports = {
  postSpaceship,
  getSpaceships,
}