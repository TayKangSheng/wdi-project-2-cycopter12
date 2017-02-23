const Snack = require('../models/snack')
var cloudinary = require('cloudinary');


let snackController = {

  list: function (req, res) {
    console.log('We are in snacks/list')
    console.log('req.user', req.user)
    console.log('req.isAuthenticated', req.isAuthenticated)
    Snack.find({}, function (err, output) {
      res.render('snacks/index', {
        snacks: output,
        flash: req.flash('flash')[0]
      })
    })
  },
  show: function (req, res, next) {
    if (req.query.status) {
      return next('route')
    }
    Snack.findById(req.params.id, function (err, output) {
      if (err) return next(err)
      res.render('snacks/show', {
        snack: output
      })
    })
  },
  edit: (req, res) => {
    Snack.findById(req.params.id, (err, snackItem) => {
      if (err) throw err
      res.render('snacks/edit', { snackItem: snackItem })
    })
  },
  update: (req, res) => {
    Snack.findOneAndUpdate({
      _id: req.params.id
    }, {
      name: req.body.snacks.name,
      taste: req.body.snacks.taste,
      ingredient: req.body.snacks.ingredient,
      categoery: req.body.snacks.category,
      fat: Number(req.body.snacks.fat),
      calorie: Number(req.body.snacks.calorie),
      description:req.body.snacks.description
    }, (err, snackItem) => {
      if (err) throw err
      res.redirect('/snacks/')
    })
  },

  // create: function (req, res, next) {
  //   Snack.create(req.body.snacks, function (err, output) {
  //     if (err) {
  //       if (err.name === 'ValidationError') {
  //         let errMessages = []
  //         for (field in err.errors) {
  //           errMessages.push(err.errors[field].message)
  //         }
  //
  //         console.log(errMessages)
  //
  //         // req.flash('flash', {
  //         //   type: 'danger',
  //         //   message: errMessages
  //         // })
  //         res.redirect('/snacks')
  //       }
  //
  //       return next(err)
  //     }
  //     // req.flash('flash', {
  //     //   type: 'success',
  //     //   message: 'Created an snack with name: ' + output.name
  //     // })
  //     res.redirect('/snacks')
  //   })
  // },


  create: (req, res) =>{
    console.log(req.file);
      cloudinary.uploader.upload(req.file.path, function(result) {
    let newSnack = new Snack({
      image:result.url,
      name: req.body.snacks.name,
      taste: req.body.snacks.taste,
      ingredient: req.body.snacks.ingredient,
      categoery: req.body.snacks.category,
      fat: Number(req.body.snacks.fat),
      calorie: Number(req.body.snacks.calorie),
      description:req.body.snacks.description
    })
    newSnack.save((err, savedEntry) =>{
      if (err) throw err
      console.log('success!')
      res.redirect('/snacks')
    })
    })
  },
  delete: function (req, res, next) {
    Snack.findByIdAndRemove(req.params.id, function (err, output) {
      if (err) return next(err)
      req.flash('flash', {
        type: 'warning',
        message: 'Deleted an snack'
      })
      res.redirect('/snacks')
    })
  }
}
module.exports = snackController
