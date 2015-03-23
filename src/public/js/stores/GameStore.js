let AppDispatcher = require('../dispatchers/AppDispatcher');
let EventEmitter = require('events').EventEmitter;
let GameConstants = require('../constants/GameConstants');
let assign = require('object-assign');
let _ = require('lodash');

let CHANGE_EVENT = 'change';

let _games = [];

function _setGames(games) {
  _games = games;
}

function _addNewGame(game) {
  _games.push(game);
}

function _addBlackCardToGame(card, gameId) {
  var game = _.chain(_games).where({'_id': gameId}).first().value();
  if (game) {
    game.blackCards.push(card);
  }
}

let GameStore = assign({}, EventEmitter.prototype, {
  getGames() {
    return _games;
  },

  getGameInfo(gameId) {
    return _.chain(_games).where({'_id': gameId}).first().value();
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(action => {
  switch (action.actionType) {
    case GameConstants.LOAD_GAMES:
      _setGames(action.games);
      GameStore.emitChange();
      break;

    case GameConstants.ADD_NEW_GAME:
      _addNewGame(action.game);
      GameStore.emitChange();
      break;

    case GameConstants.ADD_NEW_BLACK_CARD:
      _addBlackCardToGame(action.card, action.gameId);
      GameStore.emitChange();
      break;

    default:
      //no op
  }
});

module.exports = GameStore;