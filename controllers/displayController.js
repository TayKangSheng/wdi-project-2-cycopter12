const User = require('../models/snack')

let userController = {

  list: function (req, res) {
    User.find({}, function (err, output) {
      res.render('users/index', {
        snacks: output,
        flash: req.flash('flash')[0]
      })
    })
  },

  show: function (req, res, next) {
    if (req.query.status) {
      return next('route')
    }
    User.findById(req.params.id, function (err, output) {
      if (err) return next(err)
      res.render('users/show', {
        snack: output
      })
    })
  }
}

module.exports = userController
