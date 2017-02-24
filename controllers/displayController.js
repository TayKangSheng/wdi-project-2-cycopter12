const User = require('../models/snack')
const Snack = require('../models/snack')
const Comment = require('../models/comment')
let userController = {
  list: function(req, res) {
    User.find({}, function(err, output) {
      res.render('users/index', {
        snacks: output,
        flash: req.flash('flash')[0]
      })
    })
  },
  show: function(req, res, next) {
    if (req.query.status) {
      return next('route')
    }
        User.findById(req.params.id, function(err, output) {
          if (err) return next(err)
          res.render('users/show', {
            snack: snackOutput
          })
        })
  },
  comment: function(req, res, next){
    Comment.create(req.body.comment, function(err,output){
      if(err)return next(err)
      Snack.findById(req.params.id, function(err, snack){
        if(err)return next(err)
        snack.comment.push(output.id)
        snack.save(function(err, saved){
          if(err)return next(err)
          res.redirect('/users')
        })
      })
    })
  }
}

module.exports = userController
