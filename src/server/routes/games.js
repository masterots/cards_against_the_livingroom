let express = require('express');
let router = express.Router();
let nameGenerator = require('project-name-generator').generate;

router.get('/', (req, res) => {
  let games = req.db.get('games');
  games.find({})
  .success(docs => res.send(docs))
  .error(err => {
      res.status(500);
      res.send('There was an error. Please try again.');
    });
});

router.get('/new', (req, res) => {
  let games = req.db.get('games');
  games.insert({
    name: nameGenerator().spaced,
    players: [],
    whiteCards: [],
    blackCards: [],
    createDate: new Date()
  })
  .success(doc => {
      req.io.emit('new game added', doc);
    })
  .error(err => {
      res.status(500);
      res.send('There was an error. Please try again.');
    });
});

module.exports = router;