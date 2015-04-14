let bunyan = require('bunyan');
let path = require('path');
let logger = bunyan.createLogger({
  name: 'cards_against_humanity',
  streams: [
    {
      level: 'info',
      stream: process.stdout
    },
    {
      level: 'info',
      path: path.join(__dirname, '..', '..', 'log', 'myapp.log')
    }
  ]
});

module.exports = logger;
