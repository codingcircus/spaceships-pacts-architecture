const router = require('express').Router();

const {getSpaceships} = require('./handlers');

router.get('/', getSpaceships, (req, res) => {
  res.render('index', {spaceships: req.getSpaceshipsResult});
});

module.exports = router;