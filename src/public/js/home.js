let React = require('react');
let Router = require('react-router');
let DefaultRoute = Router.DefaultRoute;
let Link = Router.Link;
let Route = Router.Route;
let RouteHandler = Router.RouteHandler;
let PlayerPage = require('./components/PlayerPage.react');
let HostPage = require('./components/HostPage.react');
let CreateNewGame = require('./components/CreateNewGame.react');
let GameStore = require('./stores/GameStore');
let GameActions = require('./actions/GameActions');
let GameLinkList = require('./components/GameLinkList.react');



function _getAppState() {
  return {
    currentPlayer: {_id: '4444'}
  };
}

let HomePage = React.createClass({
  getInitialState() {
    return _getAppState();
  },

  updateGameInfo() {
    this.setState(_getAppState());
  },

  render() {
    return (
      <div>
        <CreateNewGame />
        <GameLinkList />
      </div>
    )
  }
});

let App = React.createClass({
  render() {
    return(
      <div>
        <h1>Cards Against Humanity</h1>
        <RouteHandler {...this.props} />
      </div>
    );
  }
});

let routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="host" path="/game/:gameId" handler={HostPage} />
    <Route name="player" path="/game/:gameId/player/:playerId" handler={PlayerPage} />
    <DefaultRoute handler={HomePage} />
  </Route>
);

Router.run(routes, (Handler, state) => React.render(<Handler params={state.params} />, document.getElementById('home')));

//React.render(<App />, document.getElementById('home'));