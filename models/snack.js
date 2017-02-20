var mongoose = require('mongoose')
var SnackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, 'Where\'s the name']
  },
  taste: {
    type: String,
    required: [ true, 'What type of food is this']
  },
  ingredient: String,
  categoery: String,
  fat: {
    type: Number
  },
  calorie:{
      type:Number
  },
  status: {
    type: String,
    enum: ['selected', 'unselected'],
    default: 'unselected'
  }
})

var Snack = mongoose.model('Snack', SnackSchema)

module.exports = Snack
