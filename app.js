var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
 
let Game = require('./func/game').Game;
let Logger = require('./func/color').Logger;
let session = require('express-session');

let startGame = new Game();

var app = express();

let server = require('http').createServer(app);
let io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html')
app.set('views', 'views')
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret:'@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized:true
}));

require('./routes/game')(app , startGame , io);
require('./routes/admin')(app, startGame);
require('./routes/watch')(app , startGame);
require('./routes/route')(app);
require('./routes/peek')(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(3000, function() {
  Logger.info('Server listening on port 3000');
});

module.exports = app;
