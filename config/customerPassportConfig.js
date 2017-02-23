var LocalStrategy = require('passport-local').Strategy
// var FacebookStrategy = require('passport-facebook').Strategy
const Customer = require('../models/customer')

module.exports = function (passport) {
  // gives the key to the door
  passport.serializeUser(function (customer, next) {
    next(null, customer.id)
  })
  // derived user from session=req.user
  passport.deserializeUser(function (id, next) {
    User.findById(id, function (err, customer) {
      next(err, customer)
    })
  })
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, password, next) {
    console.log('test')
    // Find user with email as given from the callback
    Customer.findOne({ 'local.email': email }, function (err, foundCustomer) {
      // if there's a user with the email
      // call next() middleware with no error arguments + update the flash data
      if (foundCustomer) {
        console.log('the same user with same email found')
        return next(null, false, req.flash('flash', {
          type: 'warning',
          message: 'This email is already used'
        }))
      } else {
        // if not found = new user
        // save user to the db, password is hash
        // call next() middleware without error argumants
        let newCustomer = new Customer({
          local: {
            email: email,
            password: Customer.encrypt(password),
            address: req.body.address // hased(password)
          }
        })
        newCustomer.save(function (err, output) {
          // function(err, theNewUser, flashData)
          return next(null, output, req.flash('flash', {
            type: 'success',
            message: 'Hello new Guest ' + output.local.email
          }))
        })
      }
    })
  }))
}
