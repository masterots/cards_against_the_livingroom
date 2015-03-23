let AppDispatcher = require('../dispatchers/AppDispatcher');
let GameConstants = require('../constants/GameConstants');
let http = require('http');
let io = require('socket.io-client');
let socket = io();

function _loadAllGames() {
  http.get('/games', response => {
    var games = '';

    response.on('data', function (buffer) {
      games += buffer;
    });

    response.on('end', function () {
      AppDispatcher.dispatch({
        actionType: GameConstants.LOAD_GAMES,
        games: JSON.parse(games)
      });
    });

  }).on('error', error => console.log(error));
}

let GameActions = {
  createNewGame() {
    http.get('/games/new', response => {
      var game = '';

      response.on('data', function (buffer) {
        game += buffer;
      });

      response.on('end', function () {
        AppDispatcher.dispatch({
          actionType: GameConstants.ADD_NEW_GAME,
          game: JSON.parse(game)
        });
      });

    }).on('error', error => console.log(error));
  },

  addNewGame(game) {
    AppDispatcher.dispatch({
      actionType: GameConstants.ADD_NEW_GAME,
      game: game
    });
  },

  joinAsPlayer(playerName) {
    http.post('/player/new', {playerName: playerName}, response => {
      var playerInfo = '';

      response.on('data', function (buffer) {
        playerInfo += buffer;
      });

      response.on('end', function () {
        AppDispatcher.dispatch({
          actionType: GameConstants.JOIN_AS_PLAYER,
          playerInfo: JSON.parse(playerInfo)
        });
      });

    }).on('error', error => console.log(error));
  }
};

_loadAllGames();

socket.on('new game added', game => GameActions.addNewGame(game));

module.exports = GameActions;