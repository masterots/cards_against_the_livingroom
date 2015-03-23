let React = require('react');
let GameActions = require('../actions/GameActions');

let CreateNewGame = React.createClass({
  createNewGame(event) {
    GameActions.createNewGame();
  },

  render() {
    return (
      <button className="btn btn-default" ref="create_new_game" onClick={this.createNewGame}>Create a new game</button>
    );
  }
});

module.exports = CreateNewGame;