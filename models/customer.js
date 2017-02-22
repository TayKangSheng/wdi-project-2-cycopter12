const bcrypt = require('bcrypt')
var mongoose = require('mongoose')
var CustomerSchema = new mongoose.Schema({
  local: {
    email: String,
    password: String
  }
})
//hooked
// CustomerSchema.pre('save', function(next){
//   var user = this;
//   this.local.password = bcrypt.hashSync(this.password, 10)
//
//
// })

CustomerSchema.statics.encrypt = function (password) {
  return bcrypt.hashSync(password, 10)
}

CustomerSchema.methods.validPassword = function(givenpassword){
  return bcrypt.compareSync(givenpassword, this.local.password)
}

var Customer = mongoose.model('Customer', CustomerSchema)

module.exports = Customer
