let React = require('react');
let BlackCardStore = require('../stores/BlackCardStore');
let BlackCardActions = require('../actions/BlackCardActions');
let GameStore = require('../stores/GameStore');
let GameCard = require('./GameCard.react');
let _ = require('lodash');

let _gameId;

function _setGameId(gameId) {
  _gameId = gameId;
}

function _getHostInfo() {
  return {
    game: GameStore.getGameInfo(_gameId)
  };
}

let HostPage = React.createClass({
  getInitialState() {
    _setGameId(this.props.params.gameId);
    return _getHostInfo(_gameId);
  },

  getNewCard() {
    BlackCardActions.getNewCard(_gameId);
  },

  updateGameInfo() {
    this.setState(_getHostInfo());
  },

  componentDidMount() {
    GameStore.addChangeListener(this.updateGameInfo);
  },

  componentWillUnmount() {
    GameStore.removeChangeListener(this.updateGameInfo);
  },

  render() {
    var pageBody;
    console.log(this.state.game);
    if (this.state.game && this.state.game.blackCards.length > 0) {
      let currentCard = _.last(this.state.game.blackCards);
      pageBody = <div>
                  <GameCard card={currentCard} black={true} current={true} />
                  <button className="btn btn-default" onClick={this.getNewCard}>Get another card</button>

                 </div>;
    } else {
      pageBody = <button className="btn btn-default" onClick={this.getNewCard}>Start the game</button>;
    }
    return (
      <div>
        {pageBody}
      </div>
    )
  }
});

module.exports = HostPage;