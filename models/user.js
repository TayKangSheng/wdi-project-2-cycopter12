const bcrypt = require('bcrypt')
var mongoose = require('mongoose')
var UserSchema = new mongoose.Schema({
  local: {
    firstName: {
      type: String,
      required: [true, 'First name not found.']
    },
    lastName: {
      type: String,
      required: [true, 'First name not found.']
    },
    password: {
      type: String,
      required: [true, 'Password not entered.']
    },
    email:{
      type: String,
      required:[true, 'Email address not found.']
    }
  }
})

UserSchema.statics.encrypt = function (password) {
  return bcrypt.hashSync(password, 10)
}

UserSchema.methods.validPassword = function(givenpassword){
  return bcrypt.compareSync(givenpassword, this.local.password)
}

const User = mongoose.model('User', UserSchema)

module.exports = User
