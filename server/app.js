// require('dotenv').config();
// var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
//
// var index = require('./routes/index');
// var users = require('./routes/users');
//
// var app = express();
/***********************
 load dotenv
***********************/

require('dotenv').config();
const history = require('connect-history-api-fallback');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const multer = require('multer');
const upload = multer();
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const fs = require('fs');
const morgan = require('morgan');

const cheat = require('./routes/cheats');
const index = require('./routes/index');
const users = require('./routes/users');


const app = express();

app.use(history());
/********************************
connect to database
********************************/
const mongoose = require('mongoose');
const mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB, { useMongoClient: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
	console.log('connected to mongoose');
})
// let mongodbURI;
// if (process.env.NODE_ENV === 'test') {
// 	mongodbURI = process.env.MONGO_TEST_URI;
// } else {
// 	mongodbURI = process.env.MONGO_URI;
// 	app.use(morgan('dev'));
// }
//
// mongoose.Promise = global.Promise;
// const mongodb = mongoose.connect(mongodbURI, { useMongoClient: true });
//
// mongodb
// 	.then((db) => {
// 		console.log('Connected to MongoDB on', db.host + ':' + db.port);
// 		app.get('/*', function(req, res) {
// 			res.sendFile(path.join(__dirname, '../dist/index.html'));
// 		});
// 		if (!module.parent) {
// 			app.listen(app.get('port'), () => {
// 				console.log('Vue js listening on port ' + app.get('port'));
// 			});
// 		}
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 	});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, '../dist', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../dist')));

app.use(expressValidator());

app.use('/', index);
app.use('/users', users);
app.use('/cheats', cheat);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
