var LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = function (passport) {
  // gives the key to the door
  passport.serializeUser(function (user, next) {
    next(null, user.id)
  })
  //derived user from session=req.user
  passport.deserializeUser(function (id, next) {
    User.findById(id, function (err, user) {
      next(err, user)
    })
  })
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, givenpassword, next) {
    User.findOne({'local.email': email}, function (err, foundUser) {
      if (err) return next(err)
      // if no user is found
      if (!foundUser) {
        return next(err, false, req.flash('flash', {
          type: 'warning',
          message: 'No user found by this email'
        }))
      }
      //if can find by email
      //check the password
      // if the password is not the same with the one in the db
      if(!foundUser.validPassword(givenpassword))return next(null,false, req.flash('flash',{
        type:'danger',
        message:'Access denied: Password is wrong'
      }))
      //if password is right, then return next with the foundUser
        return next(err,foundUser)
    })
  }))

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, password, next) {
    console.log('test')
    // Find user with email as given from the callback
    User.findOne({ 'local.email': email }, function (err, foundUser) {
      // if there's a user with the email
      // call next() middleware with no error arguments + update the flash data

      if (foundUser) {
        console.log('the same user with same email found')
        return next(null, false, req.flash('flash', {
          type: 'warning',
          message: 'This email is already used'
        }))
      } else {
        // if not found = new user
        // save user to the db, password is hash
        // call next() middleware without error argumants
        let newUser = new User({
          local: {
            email: email,
            password: User.encrypt(password) // hased(password)
          }
        })
        newUser.save(function (err, output) {
          // function(err, theNewUser, flashData)
          return next(null, output, req.flash('flash', {
            type: 'success',
            message: 'Hello new user ' + output.local.email
          }))
        })
      }
    })
  }))
}
