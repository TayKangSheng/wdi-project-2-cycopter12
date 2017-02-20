require('dotenv').config({ silent: true })
var express = require('express')
var path = require('path')
var debug = require('debug')
var logger = require('morgan')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var expressLayouts = require('express-ejs-layouts')
var app = express()
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
  cookie: { maxAge: 60000 },
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
app.use(expressLayouts)
// app.engine('ejs', require('ejs').renderFile)
app.set('view engine', 'ejs')

app.get('/test', function (req, res) {
  console.log(process.env); res.send('secret is ' + process.env.SESSION_SECRET)
})

// routes to login and signup
app.use(function(req,res,next){
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

const Auth = require('./routes/authRoutes')
app.use('/', Auth)

const Snack = require('./models/snack')
app.get('/', function (req, res) {
  res.render('homepage')
//   req.flash('flash', {
//     type: 'success',
//     message: 'Welcome to `snack` shelter'
//   }) // setting the flash data
//   res.redirect('/snacks')
})
//blocks those who are not logged in
function isNotLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next()
//blocked who are logged in
  req.flash('flash',{
    type:'danger',
    message:'Restricted Page: Please login'
  })
  return res.redirect('/login')
}
function isLoggedIn(req,res,next){
  if(req.isAuthenticated===false)return next()
  req.flash('flash',{
    type:'danger',
    message:'You have logged in before'
  })
    return res.redirect('/login')
}

app.get('/snacks', isNotLoggedIn, function (req, res) {
  Snack.find({}, function (err, output) {
    res.render('snacks/index', {
      snacks: output,
      flash: req.flash('flash')[0]
    })
  })
})
app.get('/snacks/:id',isNotLoggedIn, function (req, res, next) {
  if (req.query.status) {
    return next('route')
  }

  Snack.findById(req.params.id, function (err, output) {
    if (err) return next(err)
    res.render('snacks/show', {
      snack: output
    })
  })
})
app.get('/snacks/:id',isNotLoggedIn,function (req, res, next) {
  Snack.findByIdAndUpdate(req.params.id, {
    status: req.query.status
  }, function (err, output) {
    if (err) return next(err)

    res.redirect('/snacks')
  })
})
app.post('/snacks',isNotLoggedIn, function (req, res, next) {
  Snack.create(req.body.snacks, function (err, output) {
    if (err) {
      if (err.name === 'ValidationError') {
        let errMessages = []
        for (field in err.errors) {
          errMessages.push(err.errors[field].message)
        }

        console.log(errMessages)

        req.flash('flash', {
          type: 'danger',
          message: errMessages
        })
        res.redirect('/snacks')
      }

      return next(err)
    }
    req.flash('flash', {
      type: 'success',
      message: 'Created an snack with name: ' + output.name
    })
    res.redirect('/snacks')
  })
})
app.delete('/snacks/:id',isNotLoggedIn, function (req, res, next) {
  Snack.findByIdAndRemove(req.params.id, function (err, output) {
    if (err) return next(err)
    req.flash('flash', {
      type: 'warning',
      message: 'Deleted an snack'
    })
    res.redirect('/snacks')
  })
})


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

const port = 4000
app.listen(port, function () {
  console.log('Snack Shelter App is running on ' + port)
})
