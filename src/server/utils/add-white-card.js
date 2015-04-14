let Q = require('q');
let logger = require('../services/Logger');

function _getUsedCardsForGame(playerId, gameId, db) {
  let deferred = Q.defer();

  let cards = db.get('games');
  cards.findOne({_id: gameId}, (err, docs) => {
    if (err) {
      logger.info(err);
      deferred.reject(err);
    } else {
      deferred.resolve({cards: docs.whiteCards, playerId: playerId, gameId: gameId, db: db});
    }
  });

  return deferred.promise;
}

function _getNumberOfRemainingCards(input) {
  let deferred = Q.defer();
  let output = input;

  let cards = input.db.get('whiteCards');
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
  let cards = input.db.get('whiteCards');
  let randomSkip = Math.floor(Math.random() * input.count);
  cards.find({_id: {$nin: input.cards}}, {limit: 1, skip: randomSkip}, (err, card) => {
    if (err) {
      logger.info(err);
      deferred.reject(err);
    }
    input.selectedWhiteCard = card[0];
    deferred.resolve(input);
  });

  return deferred.promise;
}

function _addSelectedCardToPlayerAndGame(input) {
  var deferred = Q.defer();
  let games = input.db.get('games');
  let players = input.db.get('players');
  let playerUpdated = false;
  let gameUpdated = false;
  logger.info({selectedWhiteCard: input.selectedWhiteCard});
  games.findAndModify({ _id: input.gameId }, { $push: { whiteCards: input.selectedWhiteCard } })
    .success(doc => {
      gameUpdated = true;
      if (playerUpdated) {
        deferred.resolve(input);
      }
    })
    .error(error => {
      logger.info(error);
      deferred.reject(err);
    });
  console.log(input.playerId);
  players.findAndModify({ _id: input.playerId }, { $push: { whiteCards: input.selectedWhiteCard } })
    .success(doc => {
      playerUpdated = true;
      if (gameUpdated) {
        deferred.resolve(input);
      }
    })
    .error(error => {
      logger.info(error);
      deferred.reject(err);
    });
  return deferred.promise;
}

function getWhiteCard(playerId, gameId, db, io) {
  let deferred = Q.defer();

  _getUsedCardsForGame(playerId, gameId, db)
    .then(_getNumberOfRemainingCards)
    .then(_selectOneFromRemainingCards)
    .then(_addSelectedCardToPlayerAndGame)
    .then(result => {
      logger.info({white_card_added: result.selectedWhiteCard});
      //io.emit('white card added', {card: result.selectedWhiteCard, gameId: gameId});
      deferred.resolve(result.selectedWhiteCard);
    })
    .catch(err => {
      logger.info(err);
      deferred.reject(err);
    });

  return deferred.promise;
}

module.exports = {
  getWhiteCard: getWhiteCard
};