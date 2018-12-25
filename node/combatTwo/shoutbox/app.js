var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var entries = require('./routes/entries');
const register = require('./routes/register');
const login = require('./routes/login');
const api = require('./routes/api');


const validate = require('./middleware/validate');
const messages = require('./middleware/messages');
const user = require('./middleware/user');
const page = require('./middleware/page');

const Entry = require('./models/entry');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:'secret',
  resave:false,
  saveUninitialized:true
}));
app.use('/api', api.auth);
app.use(user);

app.use(messages);

app.get('/api/user/:id', api.user);
app.post('/api/entry', entries.submit);
app.get('/api/entries/:page?', page(Entry.count,3), api.entries);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/post', entries.form);
app.post('/post',
    validate.required('entry[title]'),
    validate.lengthAbove('entry[title]', 4),
    entries.submit);
app.get('/list', entries.list);

app.get('/register', register.form);
app.post('/register', register.submit);

app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);




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


const User = require('./models/user');
// const user = new User({name:'Example', pass:'test'});
// user.save(err=>{
//     if(err) console.err(err);
//     console.log('user id %d', user.id);
// });

User.getByName('Example', (err, user)=>{
    console.log(user);
});
