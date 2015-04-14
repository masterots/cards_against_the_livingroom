let React = require('react');
let PlayerStore = require('../stores/PlayerStore');
let GameCard = require('./GameCard.react');

function _getState() {
  return {
    player: PlayerStore.getPlayer()
  };
}

let PlayerPage = React.createClass({
  getInitialState() {
    return _getState();
  },

  _onChange() {
    this.setState(_getState());
  },

  componentDidMount() {
    PlayerStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    PlayerStore.removeChangeListener(this._onChange);
  },

  render() {
    console.log(this.state);
    return (
      <div>
        Player page
      </div>
    )
  }
});

module.exports = PlayerPage;