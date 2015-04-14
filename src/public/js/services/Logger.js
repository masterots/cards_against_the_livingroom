let bunyan = require('bunyan');
let logger = bunyan.createLogger({
  name: 'cards_against_humanity',
  streams: [
    {
      level: 'info',
      stream: process.stdout            // log INFO and above to stdout
    },
    {
      level: 'info',
      path: '../../log/myapp-error.log'  // log ERROR and above to a file
    }
  ]
});

module.exports = logger;