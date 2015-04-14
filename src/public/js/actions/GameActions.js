let AppDispatcher = require('../dispatchers/AppDispatcher');
let GameConstants = require('../constants/GameConstants');
let http = require('http');
let request = require('request');
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
    var url = window.location.href;
    var arr = url.split("/");
    var result = arr[0] + "//" + arr[2];
    request.post(`${result}/games/new`, (error, response, body) => {
      if (error) {
        console.log(error);
      }
    });
  },

  addNewGame(game) {
    AppDispatcher.dispatch({
      actionType: GameConstants.ADD_NEW_GAME,
      game: game
    });
  },

  drawWhiteCard(playerId, gameId) {
    request.post(`http://localhost:3000/games/${gameId}/addPlayer`, { form: { playerName: playerName } }, (err, httpResponse, body) => {
      if (err) {
        console.log(err);
        return;
      }
      let player = JSON.parse(body);

      AppDispatcher.dispatch({
        actionType: GameConstants.CREATE_NEW_PLAYER,
        playerInfo: player,
        gameId: gameId
      });

      window.location.href = `/#/game/${gameId}/player/${player._id}`;
    });
  },

  addBlackCardToGame(result) {
    AppDispatcher.dispatch({
      actionType: GameConstants.ADD_NEW_BLACK_CARD,
      card: result.card,
      gameId: result.gameId
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

socket.on('new game created', game => GameActions.addNewGame(game));
socket.on('black card added', result => GameActions.addBlackCardToGame(result));

module.exports = GameActions;