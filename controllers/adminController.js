const Admin = require('../models/user')
var passport = require('passport')

let adminController = {
  signup: function (req, res) {
    res.render('auth/signup', {
      flash: req.flash('flash')[0]
    }) // render the form
  },

  authCreate: function (req, res) {
    var signupStrategy = passport.authenticate('local-signup', {
      successRedirect: '/snacks',
      failureRedirect: '/signup',
      failureFlash: false
    })
    return signupStrategy(req, res)
  },

  login:function (req, res) {
      res.render('auth/login',{
        flash: req.flash('flash')[0]
      })
    },

  authLogin: function (req, res, next) {
    var loginStrategy = passport.authenticate('local-login', {
      successRedirect: '/snacks',
      failureRedirect: '/login',
      failureFlash: false
    })
    return loginStrategy(req, res, next)
  },

  logout: function (req,res){
    req.logout()//remove the session => req.user = undefined, req.isAuthenticated() = false
    res.redirect('/')
  }
}
module.exports = adminController
