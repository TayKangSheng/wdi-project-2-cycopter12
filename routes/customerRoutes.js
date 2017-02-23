var express = require('express')
var router = express.Router()
var passport = require('passport')
const isLoggedIn = require('../security/isLoggedIn')

router.get('/signup-customer', isLoggedIn, function (req, res) {
  res.render('auth/signup-customer', {
    flash: req.flash('flash')[0]
  }) // render the form
})

router.post('/signup-customer', function (req, res) {
  var signupStrategy = passport.authenticate('local-signupCustomer', {
    successRedirect: '/users',
    failureRedirect: '/signup-customer',
    failureFlash: false
  })

  return signupStrategy(req, res)
})

router.get('/login-customer', isLoggedIn, function (req, res) {
    res.render('auth/login-customer',{
      flash: req.flash('flash')[0]
    })
  })

router.post('/login-customer', function (req, res, next) {
  var loginStrategy = passport.authenticate('local-loginCustomer', {
    successRedirect: '/users',
    failureRedirect: '/login-customer',
    failureFlash: false
  })
  return loginStrategy(req, res, next)
})

router.get('/logout', function (req,res){
  req.logout()//remove the session => req.user = undefined, req.isAuthenticated() = false
  res.redirect('/')
})

module.exports = router
