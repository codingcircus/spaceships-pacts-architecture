const router = require('express').Router();

const {
  postSpaceship,
  getSpaceships,
} = require('./handlers');

router.post('/', postSpaceship);
router.get('/', getSpaceships);

module.exports = router;