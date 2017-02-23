var LocalStrategy = require('passport-local').Strategy
// var FacebookStrategy = require('passport-facebook').Strategy
const Customer = require('../models/customer')

module.exports = function (passport) {
  // gives the key to the door
  // passport.serializeUser(function (customer, next) {
  //   next(null, customer.id)
  // })
  // derived user from session=req.user
  // passport.deserializeUser(function (id, next) {
  //   console.log("Come Here!");
  //   Customer.findById(id, function (err, customer) {
  //     next(err, customer)
  //   })
  // })
  passport.use('local-loginCustomer', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, givenpassword, next) {
    Customer.findOne({'local.email': email}, function (err, foundCustomer) {
      if (err) return next(err)
      // if no user is found
      if (!foundCustomer) {
        return next(err, false, req.flash('flash', {
          type: 'warning',
          message: 'No user found by this email'
        }))
      }

      if (!foundCustomer.validPassword(givenpassword)) {
        return next(null, false, req.flash('flash', {
          type: 'danger',
          message: 'Access denied: Password is wrong'
        }))
      }
      // if password is right, then return next with the foundUser
      return next(null, foundCustomer)
      // }
    })
  }))

  passport.use('local-signupCustomer', new LocalStrategy({
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
