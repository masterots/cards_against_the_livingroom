let React = require('react');
let Router = require('react-router');
let Link = Router.Link;
let moment = require('moment');
let PlayerActions = require('../actions/PlayerActions');

let GameLinkList = React.createClass({
  propTypes: {
    game: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      joinButtonVisible: 'hidden',
      playerName: ''
    };
  },

  handleInputChange(event) {
    if (event.target.value.length > 0) {
      this.setState({
        joinButtonVisible: 'visible',
        playerName: event.target.value
      });
    } else {
      this.setState({
        joinButtonVisible: 'hidden',
        playerName: event.target.value
      });
    }
  },

  createNewPlayer() {
    PlayerActions.addNewPlayer(React.findDOMNode(this.refs.player_name).value, this.props.game._id);
  },

  handleJoinPlayer() {
    //this.setState({joinButtonVisible: 'visible'});
  },

  render() {
    return (
      <div>
        <h3>{this.props.game.name}</h3>
        <p>{moment(this.props.game.createDate).format('MM-DD-YYYY hh:mm:ss')}</p>
        <Link className="btn btn-default" to="host" params={{gameId: this.props.game._id}}>Join as host</Link>
        <span>OR</span>
        <input type="text" ref="player_name" value={this.state.playerName} placeholder="Enter player name" onChange={this.handleInputChange}/>
        <div style={{'visibility': this.state.joinButtonVisible}}>
          <a href="#" className="btn btn-default" onClick={this.createNewPlayer}>Join as player</a>
        </div>
      </div>
    );
  }
});


//<Link className="btn btn-default" to="player" params={{gameId: this.props.game._id, playerId: 0}}>Join as player<
//

module.exports = GameLinkList;