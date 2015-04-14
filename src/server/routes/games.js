let express = require('express');
let router = express.Router();
let nameGenerator = require('project-name-generator').generate;
let blackCardUtil = require('../utils/add-black-card');
let logger = require('../services/Logger');
let player = require('../utils/add-player');

router.get('/', (req, res) => {
  let games = req.db.get('games');
  games.find({})
    .success(docs => res.send(docs))
    .error(err => {
      res.status(500);
      res.send('There was an error. Please try again.');
    });
});

router.post('/new', (req, res) => {
  let games = req.db.get('games');
  games.insert({
    name: nameGenerator().spaced,
    players: [],
    whiteCards: [],
    blackCards: [],
    createDate: new Date()
  })
  .success(doc => {
    blackCardUtil.getBlackCard(doc._id, req.db, req.io);
    logger.info({new_game_created: doc});
    req.io.emit('new game created', doc);
    res.json({gameId: doc});
  })
  .error(err => {
    logger.info(err);
    res.status(500);
    res.send('There was an error. Please try again.');
  });
});

router.post('/:gameId/addPlayer', (req, res) => {
  let playerName = req.body.playerName;
  let gameId = req.params.gameId;

  player.addPlayer(gameId, playerName, req.db)
    .then(result => {
      console.log(result);
      res.send(result);
    });

});

module.exports = router;