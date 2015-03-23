var _ = require('lodash');
var Q = require('q');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/cards_against_humanity');

var cards = require('../cards.json');

var packs = cards.order;
var whiteCardsTextArray = cards.whiteCards;
var whiteCards = [];

packs.forEach(function(pack) {
  var whiteCardsIndexes = cards[pack].white;
  var packName = cards[pack].name;
  whiteCardsIndexes.forEach(function(index) {
    whiteCards.push({
      text: whiteCardsTextArray[index],
      pack: packName
    });
  });
});

function resetCards() {
  var deferred = Q.defer();

  var collection = db.get('whiteCards');
  collection.remove({});
  collection.insert(whiteCards)
    .success(function(doc) {
      deferred.resolve('white cards done');
    })
    .error(function(error) {
      deferred.reject(error);
    });

  return deferred.promise;
}

module.exports = {
  resetCards: resetCards
};