var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv')
const connectDB = require('./config/db')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')

var app = express();

//Logging
if (process.env.NODE_ENV =='development'){
  app.use(morgan('dev'))
}

//Handlebars
app.engine('.hbs',exphbs({defaultLayout: 'main', extname:'.hbs'}));
app.set('view engine','.hbs');

//Sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized:false
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())


//static folder
app.use(express.static(path.join(__dirname,'public')))

//routes

app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))

//Load config
dotenv.config({ path: './config/config.env'})

//passport confif
require('./config/passport')(passport)

//databes_connection

connectDB()

const PORT = process.env.PORT || 5050

app.listen(PORT,()=>{
  console.log('Server running at',PORT)
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


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
