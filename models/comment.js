var mongoose = require('mongoose')

//anonymous commenting

var commentSchema = mongoose.Schema({
    comment: {
      type: String,
      required: true,
    },
     name: {
      type: String,
      required: true,
    },
    snackId: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Snack',
    }]
})

var Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
