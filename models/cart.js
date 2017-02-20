var mongoose = require('mongoose')
var CartSchema = new mongoose.Schema({
  item: [{ type: mongoose.Schema.ObjectId, ref: 'Snack' }]
})
var Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart
