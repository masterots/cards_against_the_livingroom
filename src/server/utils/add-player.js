let Q = require('q');
let logger = require('../services/Logger');
let util = require('../utils/add-white-card');

function _createPlayer(playerName, db) {
  let deferred = Q.defer();

  let player = {
    playerName: playerName,
    whiteCards: [],
    blackCardsWon: []
  };
  let players = db.get('players');
  players.insert(player)
  .success(newPlayer => deferred.resolve(newPlayer))
  .error(err => {
      logger.info(err);
      deferred.reject(err);
    });

  return deferred.promise;
}

function _addPlayerToGame(player, gameId, db) {
  let deferred = Q.defer();

  let games = db.get('games');
  games.findAndModify({ _id: gameId }, { $push: { players: player._id } })
    .success(updatedGame => deferred.resolve(player))
    .error(err => {
      logger.info(err);
      deferred.reject(err);
    });

  return deferred.promise;
}

function addPlayer(gameId, playerName, db) {
  let deferred = Q.defer();

  let player;
  _createPlayer(playerName, db)
    .then(newPlayer => {
      player = newPlayer;
      _addPlayerToGame(newPlayer, gameId, db);
    })
    .then(result => {
      for (let i = 0; i < 7; i++) {
        util.getWhiteCard(player._id, gameId, db);
      }
    })
    .then(result => {
      deferred.resolve(player);
    });

  return deferred.promise;
}

module.exports = {
  addPlayer: addPlayer
};