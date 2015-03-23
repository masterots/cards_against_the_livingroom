let React = require('react');
let Router = require('react-router');
let Link = Router.Link;
let CreateNewGame = require('./CreateNewGame.react');
let GameStore = require('../stores/GameStore');

function _getGameInfo() {
  return {
    gameInfo: GameStore.getGameInfo()
  };
}

let HomePage = React.createClass({
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
    let gameLinks;
    console.log(this.state.gameInfo);
    if (this.state.gameInfo._id) {
      gameLinks = <div><Link to="host">Join as host</Link><Link to="host">Join as player</Link></div>;
    } else {
      gameLinks = <p>No games</p>;
    }

    return (
      <div>
        <CreateNewGame />
        {gameLinks}
      </div>
    )
  }
});

module.exports = HomePage;