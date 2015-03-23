let AppDispatcher = require('../dispatchers/AppDispatcher');
let GameConstants = require('../constants/GameConstants');
let http = require('http');

let BlackCardActions = {
  getNewCard(gameId) {
    http.get(`/cards/black/random?gameId=${gameId}`, response => {
      var card = '';

      response.on('data', function (buffer) {
        card += buffer;
      });

      response.on('end', function () {
        AppDispatcher.dispatch({
          actionType: GameConstants.ADD_NEW_BLACK_CARD,
          card: JSON.parse(card),
          gameId: gameId
        });
      });

    }).on('error', error => console.log(error));
  }
};

module.exports = BlackCardActions;