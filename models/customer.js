const bcrypt = require('bcrypt')
var mongoose = require('mongoose')
var CustomerSchema = new mongoose.Schema({
  local: {
    email: String,
    password: String,
    address: String
  }
})

CustomerSchema.statics.encrypt = function (password) {
  return bcrypt.hashSync(password, 10)
}

CustomerSchema.methods.validPassword = function(givenpassword){
  return bcrypt.compareSync(givenpassword, this.local.password)
}

var Customer = mongoose.model('Customer', CustomerSchema)

module.exports = Customer
