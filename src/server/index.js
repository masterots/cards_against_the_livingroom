var express = require('express');
var path = require('path');
var app = express();
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/cards_against_humanity');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var index = require('./routes/index');
var cards = require('./routes/cards');
var games = require('./routes/games');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let staticPath = path.join(__dirname, '..', 'public');

app.use(express.static(staticPath));

// Make our db accessible to our router
app.use(function(req, res, next) {
  req.db = db;
  next();
});

// Make our db accessible to our router
app.use(function(req, res, next) {
  req.io = io;
  next();
});

io.on('connection', () => console.log('client connected'));

app.use('/', index);
app.use('/cards', cards);
app.use('/games', games);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') !== 'production') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.set('port', process.env.PORT || 3000);
server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
