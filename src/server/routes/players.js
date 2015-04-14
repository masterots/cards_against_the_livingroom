let express = require('express');
let router = express.Router();
let nameGenerator = require('project-name-generator').generate;
let blackCardUtil = require('../utils/add-black-card');
let logger = require('../services/Logger');
let player = require('../utils/add-player');

router.get('/:playerId', (req, res) => {
  let playerId = req.params.playerId;
  let players = req.db.get('players');
  players.findOne({_id: playerId})
    .success(docs => res.send(docs))
    .error(err => {
      res.status(500);
      res.send('There was an error. Please try again.');
    });
});

module.exports = router;