let React = require('react');
let GameStore = require('../stores/GameStore');

function _getGameInfo() {
  return {
    gameInfo: GameStore.getGameInfo()
  };
}

let PlayerPage = React.createClass({
  getInitialState() {
    return _getGameInfo();
  },

  updateGameInfo() {
    this.setState(_getGameInfo());
  },

  componentDidMount() {
    GameStore.addChangeListener(this.updateGameInfo);
  },

  componentWillUnmount() {
    GameStore.removeChangeListener(this.updateGameInfo);
  },

  render() {
    console.log(this.props.params);
    return (
      <div>
        Player page
      </div>
    )
  }
});

module.exports = PlayerPage;