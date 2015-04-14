let AppDispatcher = require('../dispatchers/AppDispatcher');
let PlayerConstants = require('../constants/PlayerConstants');
let http = require('http');
let request = require('request');
let io = require('socket.io-client');
let socket = io();

let PlayerActions = {
  setPlayer(playerId) {
    http.get(`/players/${playerId}`, response => {
      var playerInfo = '';

      response.on('data', function (buffer) {
        playerInfo += buffer;
      });

      response.on('end', function () {
        AppDispatcher.dispatch({
          actionType: PlayerConstants.SET_PLAYER,
          playerInfo: JSON.parse(playerInfo)
        });
      });

    }).on('error', error => console.log(error));
  },

  addNewPlayer(playerName, gameId) {
    request.post(`http://localhost:3000/games/${gameId}/addPlayer`, { form: { playerName: playerName } }, (err, httpResponse, body) => {
      if (err) {
        console.log(err);
        return;
      }
      let player = JSON.parse(body);

      PlayerActions.setPlayer(player._id);

      AppDispatcher.dispatch({
        actionType: PlayerConstants.SET_PLAYER,
        player: player,
        gameId: gameId
      });

      window.location.href = `/#/game/${gameId}/player/${player._id}`;
    });
  },

  addNewCards() {

  }
};

//socket.on('new game created', game => PlayerActions.addNewGame(game));
//socket.on('black card added', result => PlayerActions.addBlackCardToGame(result));

module.exports = PlayerActions;