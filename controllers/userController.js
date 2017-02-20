let User = require('../models/user')

let userController = {
  list: (req, res) => {
    User.find({}, (err, snacks) => {
      if (err) throw err
      res.render('snacks/index', { snacks: snacks })
    })
  },

  new: (req, res) => {
    res.render('auth/signup')
  },

  create: (req, res) => {
    let newUser = new User({
      title: req.body.title,
      description: req.body.description,
      completed: false
    })
    newUser.save(function (err, savedEntry) {
      if (err) throw err
      res.redirect('/snacks')
    })
  },

  edit: (req, res) => {
    Todo.findById(req.params.id, (err, todoItem) => {
      if (err) throw err
      res.render('todo/edit', { todoItem: todoItem })
    })
  },

  update: (req, res) => {
    Todo.findOneAndUpdate({
      _id: req.params.id
    }, {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed
    }, (err, todoItem) => {
      if (err) throw err
      res.redirect('/todo/' + todoItem.id)
    })
  },

  delete: (req, res) => {
    Todo.findByIdAndRemove(req.params.id, (err, todoItem) => {
      if (err) throw err
      res.redirect('/snacks')
    })
  }

}

module.exports = userController
