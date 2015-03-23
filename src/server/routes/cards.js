let express = require('express');
let router = express.Router();
let Q = require('q');

function getUsedCardsForGame(gameId, db) {
  let deferred = Q.defer();

  let cards = db.get('games');
  cards.findOne({_id: gameId}, (err, docs) => {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({cards: docs.blackCards, db: db});
    }
  });

  return deferred.promise;
}

function getNumberOfRemainingCards(input) {
  let output = input;
  let deferred = Q.defer();

  let cards = input.db.get('blackCards');
  cards.count({_id: {$nin: input.cards}}, (err, count) => {
    if (err) {
      deferred.reject(err);
    }
    output.count = count;
    deferred.resolve(output);
  });

  return deferred.promise;
}

router.get('/black/random', (req, res) => {
  getUsedCardsForGame(req.query.gameId, req.db)
    .then(getNumberOfRemainingCards)
    .then(results => {
      var deferred = Q.defer();
      let cards = req.db.get('blackCards');
      let randomSkip = Math.floor(Math.random() * results.count);
      cards.find({_id: {$nin: results.cards}}, {limit: 1, skip: randomSkip}, (err, card) => {
        if (err) {
          deferred.reject(err);
        }
        deferred.resolve(card[0]);
      });

      return deferred.promise;
    })
    .then(card => {
      let games = req.db.get('games');
      games.findAndModify({ _id: req.query.gameId }, { $push: { blackCards: card } })
        .success(doc => {
          res.json(card);
        })
        .error(error => res.status(500).send('There was an error. Please try again.'));
    })
    .catch(err => {
      res.status(500);
      res.send('There was an error. Please try again.');
    });
});

module.exports = router;