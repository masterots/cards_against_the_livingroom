let React = require('react');

let GameCard = React.createClass({
  propTypes: {
    card: React.PropTypes.object.isRequired,
    black: React.PropTypes.bool,
    current: React.PropTypes.bool
  },

  render() {
    var classname = this.props.black ? 'card black' : 'card white';
    classname += this.props.current ? ' current' : '';
    let regexp_underscore = new RegExp('_', 'ig');
    let text = this.props.card.text.replace(regexp_underscore, '<span class="blank-space">&nbsp;</span>');
    let pickText = this.props.card.pick !== 1 ? 'cards' : 'card';
    return (
      <div className={classname}>
        <ul>
          <li dangerouslySetInnerHTML={{__html: text}}></li>
          <li>Pick {this.props.card.pick} {pickText}</li>
        </ul>
      </div>
    );
  }
});

module.exports = GameCard;