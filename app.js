var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
require('./models/users');
require('./models/product');
require('./models/category');
require('./models/SinhVien');
require('./models/channel');
require('./models/video');

mongoose.connect('mongodb+srv://trinhchanphuc123:Ui5yQVJKWO22rVV0@cluster0.w6qcd.mongodb.net/test')
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ProductRouter = require('./routes/Product');
var uploadRouter = require('./routes/upload');
var sendGmailRouter = require('./routes/sendGmail');
var asmRouter = require('./routes/asm');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/upload', uploadRouter);
app.use('/sendEmail', sendGmailRouter);
app.use('/asm', asmRouter);

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

module.exports = app;
