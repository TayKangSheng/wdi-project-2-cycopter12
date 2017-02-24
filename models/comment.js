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
    snack_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    }
})

var Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
