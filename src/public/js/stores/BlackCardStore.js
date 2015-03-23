let AppDispatcher = require('../dispatchers/AppDispatcher');
let EventEmitter = require('events').EventEmitter;
let BlackCardConstants = require('../constants/BlackCardConstants');
let assign = require('object-assign');

let CHANGE_EVENT = 'change';

let _currentBlackCard = {};
let _usedCards = [];

function _setCurrentBlackCard(cardInfo) {
  _currentBlackCard = cardInfo;
}

let BlackCardStore = assign({}, EventEmitter.prototype, {
  getCurrentBlackCard() {
    return _currentBlackCard;
  },

  addUsedCards(cards) {
    _usedCards.push.apply(_usedCards, cards);
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
    case BlackCardConstants.GET_NEW_CARD:
      BlackCardStore.addUsedCards([BlackCardStore.getCurrentBlackCard()]);
      _setCurrentBlackCard(action.cardInfo);
      BlackCardStore.emitChange();
      break;

    default:
    //no op
  }
});

module.exports = BlackCardStore;