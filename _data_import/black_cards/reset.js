var _ = require('lodash');
var Q = require('q');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/cards_against_humanity');

var cards = require('../cards.json');

var packs = cards.order;
var blackCards = cards.blackCards;

packs.forEach(function(pack) {
  var blackCardsIndexes = cards[pack].black;
  var packName = cards[pack].name;
  blackCardsIndexes.forEach(function(index) {
    blackCards[index].pack = packName;
  });
});

function resetCards() {
  var deferred = Q.defer();

  var collection = db.get('blackCards');
  collection.remove({});
  collection.insert(blackCards)
    .success(function(doc) {
      deferred.resolve('black cards done');
    })
    .error(function(error) {
      deferred.reject(error);
    });

  return deferred.promise;
}

module.exports = {
  resetCards: resetCards
};