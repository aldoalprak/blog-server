var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var logger = require('morgan');
require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds129560.mlab.com:29560/blog_alprak`,function(err){
  if(err) {
    console.log(err)
  }else{
    console.log("db connected")
  }
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');


var app = express();

app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);

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

});

module.exports = app;
