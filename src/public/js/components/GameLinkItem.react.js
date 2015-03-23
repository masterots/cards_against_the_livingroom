let React = require('react');
let Router = require('react-router');
let Link = Router.Link;
let moment = require('moment');

let GameLinkList = React.createClass({
  propTypes: {
    game: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <div>
        <h3>{this.props.game.name}</h3>
        <p>{moment(this.props.game.createDate).format('MM-DD-YYYY hh:mm:ss')}</p>
        <Link to="host" params={{gameId: this.props.game._id}}>Join as host</Link>
      </div>
    );
  }
});

module.exports = GameLinkList;