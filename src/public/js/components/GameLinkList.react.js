let React = require('react');
let GameStore = require('../stores/GameStore');
let GameLinkItem = require('./GameLinkItem.react');
let _ = require('lodash');

function _getListState() {
  return {
    games: GameStore.getGames()
  };
}

let GameLinkList = React.createClass({
  updateListState() {
    this.setState(_getListState());
  },

  getInitialState() {
    return _getListState();
  },

  componentDidMount() {
    GameStore.addChangeListener(this.updateListState);
  },

  componentWillUnmount() {
    GameStore.removeChangeListener(this.updateListState)
  },

  render() {
    var items = _(_.sortBy(this.state.games, ['createDate'])).reverse().map(game => <GameLinkItem game={game} key={game._id} />);
    return (
      <div>
        {items}
      </div>
    );
  }
});

module.exports = GameLinkList;