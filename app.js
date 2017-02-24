require('dotenv').config({ silent: true })
var express = require('express')
var path = require('path')
var debug = require('debug')
var logger = require('morgan')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var expressLayouts = require('express-ejs-layouts')
var app = express()
const port = process.env.PORT || 4000
var router = express.Router()
var methodOverride = require('method-override')
var passport = require('passport')

// all you need for flash data
var session = require('express-session')
var flash = require('connect-flash')
var cookieParser = require('cookie-parser')
var MongoStore = require('connect-mongo')(session)

var mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise=global.Promise
app.use(express.static('public'))

app.use(cookieParser(process.env.SESSION_SECRET))
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 660000 },
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect: true
  })
}))

// initialize passport into your application
app.use(passport.initialize())
app.use(passport.session())
require('./config/passportConfig')(passport)

app.use(flash())

app.use(methodOverride('_method'))
app.use(logger('dev'))

app.use(bodyParser.urlencoded({ extended: true }))
// app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(expressLayouts)
// app.engine('ejs', require('ejs').renderFile)
app.use(express.static(path.join(__dirname, 'public')))

app.get('/test', function (req, res) {
  console.log(process.env); res.send('secret is ' + process.env.SESSION_SECRET)
})

// routes to login and signup
app.use(function(req,res,next){
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})


const SnackRoutes = require('./routes/snackRoutes')
app.use('/snacks', SnackRoutes)

const AdminRoutes = require('./routes/adminRoutes')
app.use('/', AdminRoutes)

const DisplayRoutes = require('./routes/displayRoutes')
app.use('/users', DisplayRoutes)

app.get('/', function (req, res) {
  res.render('homepage')
})
app.get('/about', function (req, res) {
  res.render('about')
})

app.get('/profile', function (req, res){
  res.render('/profile')
})


if (app.get('env') === 'development') {
  // app.use(function (err, req, res, next) {
  //   res.status(err.status || 500)
  //   res.render('error', {
  //     message: err.message,
  //     error: err
  //   })
  // })
}

// const port = 4000
app.listen(port, function () {
  console.log('Snack Shelter App is running on ' + port)
})
