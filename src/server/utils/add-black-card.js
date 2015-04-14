let Q = require('q');
let logger = require('../services/Logger');

function _getUsedCardsForGame(gameId, db) {
  let deferred = Q.defer();

  let cards = db.get('games');
  cards.findOne({_id: gameId}, (err, docs) => {
    if (err) {
      logger.info(err);
      deferred.reject(err);
    } else {
      deferred.resolve({cards: docs.blackCards, gameId: gameId, db: db});
    }
  });

  return deferred.promise;
}

function _getNumberOfRemainingCards(input) {
  let deferred = Q.defer();
  let output = input;

  let cards = input.db.get('blackCards');
  cards.count({_id: {$nin: output.cards}}, (err, count) => {
    if (err) {
      logger.info(err);
      deferred.reject(err);
    }
    output.count = count;
    deferred.resolve(output);
  });

  return deferred.promise;
}

function _selectOneFromRemainingCards(input) {
  var deferred = Q.defer();
  let cards = input.db.get('blackCards');
  let randomSkip = Math.floor(Math.random() * input.count);
  cards.find({_id: {$nin: input.cards}}, {limit: 1, skip: randomSkip}, (err, card) => {
    if (err) {
      logger.info(err);
      deferred.reject(err);
    }
    input.selectedBlackCard = card[0];
    deferred.resolve(input);
  });

  return deferred.promise;
}

function _addSelectedCardToGame(input) {
  var deferred = Q.defer();
  let games = input.db.get('games');
  logger.info({selectedBlackCard: input.selectedBlackCard});
  games.findAndModify({ _id: input.gameId }, { $push: { blackCards: input.selectedBlackCard } })
    .success(doc => {
      deferred.resolve(input);
    })
    .error(error => {
      logger.info(error);
      deferred.reject(err);
    });
  return deferred.promise;
}

function getBlackCard(gameId, db, io) {
  let deferred = Q.defer();

  _getUsedCardsForGame(gameId, db)
    .then(_getNumberOfRemainingCards)
    .then(_selectOneFromRemainingCards)
    .then(_addSelectedCardToGame)
    .then(result => {
      logger.info({black_card_added: result.selectedBlackCard});
      io.emit('black card added', {card: result.selectedBlackCard, gameId: gameId});
      deferred.resolve(result.selectedBlackCard);
    })
    .catch(err => {
      logger.info(err);
      deferred.reject(err);
    });

  return deferred.promise;
}

module.exports = {
  getBlackCard: getBlackCard
};