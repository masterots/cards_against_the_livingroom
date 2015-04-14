let express = require('express');
let router = express.Router();
let Q = require('q');
let util = require('../utils/add-white-card');

router.post('/white/new', (req, res) => {
  let playerId = req.query.playerId;
  let gameId = req.query.gameId;
  util.getWhiteCard(playerId, gameId)
    .then(results => {
      res.send(results);
    });
});

//router.get('/black/random', (req, res) => {
//  getUsedCardsForGame(req.query.gameId, req.db)
//    .then(getNumberOfRemainingCards)
//    .then(results => {
//      var deferred = Q.defer();
//      let cards = req.db.get('blackCards');
//      let randomSkip = Math.floor(Math.random() * results.count);
//      cards.find({_id: {$nin: results.cards}}, {limit: 1, skip: randomSkip}, (err, card) => {
//        if (err) {
//          deferred.reject(err);
//        }
//        deferred.resolve(card[0]);
//      });
//
//      return deferred.promise;
//    })
//    .then(card => {
//      let games = req.db.get('games');
//      games.findAndModify({ _id: req.query.gameId }, { $push: { blackCards: card } })
//        .success(doc => {
//          res.json(card);
//        })
//        .error(error => res.status(500).send('There was an error. Please try again.'));
//    })
//    .catch(err => {
//      res.status(500);
//      res.send('There was an error. Please try again.');
//    });
//});

module.exports = router;