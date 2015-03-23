#!/usr/bin/env node
var Q = require('q');
var blackCards = require('./black_cards/reset');
var whiteCards = require('./white_cards/reset');

Q.all([
  blackCards.resetCards(),
  whiteCards.resetCards()
])
.then(function(results) {
  console.log(results);
  process.exit(0);
});

