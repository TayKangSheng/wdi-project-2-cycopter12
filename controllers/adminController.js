const Admin = require('../models/user')
var passport = require('passport')

let adminController = {

  signup: function(req, res) {
    res.render('auth/signup', {
      flash: req.flash('flash')[0]
    })
  },
  create: function(req, res) {
    var signupStrategy = passport.authenticate('local-signup', {
      successRedirect: '/',
      failureRedirect: '/signup',
      failureFlash: false
    })
    return signupStrategy(req, res)
  },
  login: function(req, res) {
    res.render('auth/login', {
      flash: req.flash('flash')[0]
    })
  },

  create: function(req, res) {
    var loginStrategy = passport.authenticate('local-login', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: false
    })
    return loginStrategy(req, res)
  },

  logout: function(req, res) {
    req.logout() //remove the session => req.user = undefined, req.isAuthenticated() = false
    res.redirect('/')
  }
}
module.exports = adminController
