var express = require('express');
var router = express.Router();
let logger = require('../services/Logger');

router.get('/', function(req, res) {
  logger.info('rendered home page');
  res.render('index', { title: 'Cards Against Humanity' });
});

module.exports = router;