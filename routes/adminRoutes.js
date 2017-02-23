var express = require('express')
var router = express.Router()
// const adminController = require('../controllers/adminController')
var passport = require('passport')

router.get('/signup', function (req, res) {
  res.render('auth/signup', {
    flash: req.flash('flash')[0]
  }) // render the form
})

router.post('/signup', function (req, res) {
  console.log('heeelelele');
  var signupStrategy = passport.authenticate('local-signup', {
    successRedirect: '/snacks',
    failureRedirect: '/signup',
    failureFlash: false
  })
  return signupStrategy(req, res)
})

router.get('/login', function (req, res) {
    res.render('auth/login',{
      flash: req.flash('flash')[0]
    })
  })

router.post('/login', function (req, res, next) {
  var loginStrategy = passport.authenticate('local-login', {
    successRedirect: '/snacks',
    failureRedirect: '/login',
    failureFlash: false
  })
  return loginStrategy(req, res, next)
})

router.get('/logout', function (req,res){
  req.logout()//remove the session => req.user = undefined, req.isAuthenticated() = false
  res.redirect('/')
})

// router.get('/signup', adminController.signup)
//
// router.post('/signup', adminController.authCreate)
//
// router.get('/login', adminController.login)
//
// router.post('/login', adminController.authLogin)
//
// router.get('/users/:id', adminController.show)
//
// router.get('/logout', adminController.logout)


module.exports = router
