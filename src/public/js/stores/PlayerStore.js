let AppDispatcher = require('../dispatchers/AppDispatcher');
let EventEmitter = require('events').EventEmitter;
let PlayerConstants = require('../constants/PlayerConstants');
let assign = require('object-assign');

let CHANGE_EVENT = 'change';

let _player = {};

function _setPlayer(player) {
  _setPlayer = player;
}

let PlayerStore = assign({}, EventEmitter.prototype, {
  getPlayer() {
    return _player;
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
    case PlayerConstants.SET_PLAYER:
      _setPlayer(action.playerInfo);
      PlayerStore.emitChange();
      break;

    default:
    //no op
  }
});

module.exports = PlayerStore;