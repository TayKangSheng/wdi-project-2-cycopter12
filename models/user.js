const bcrypt = require('bcrypt')
var mongoose = require('mongoose')
var UserSchema = new mongoose.Schema({
  local: {
    email: String,
    password: String
  }
})
//hooked
// UserSchema.pre('save', function(next){
//   var user = this;
//   this.local.password = bcrypt.hashSync(this.password, 10)
//
//
// })

UserSchema.statics.encrypt = function (password) {
  return bcrypt.hashSync(password, 10)
}

UserSchema.methods.validPassword = function(givenpassword){
  return bcrypt.compareSync(givenpassword, this.local.password)
}

var User = mongoose.model('User', UserSchema)

module.exports = User
