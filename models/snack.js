var mongoose = require('mongoose')
var SnackSchema = new mongoose.Schema({
  image: String,
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
  description:{
    type: String,
    required: [true, 'what is the description']
  },
  comment:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
})

var Snack = mongoose.model('Snack', SnackSchema)

module.exports = Snack
