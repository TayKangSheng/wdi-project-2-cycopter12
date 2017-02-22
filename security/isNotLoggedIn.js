module.exports = function (req, res, next) {
  if (req.isAuthenticated()) return next()

  req.flash('flash', {
    type: 'danger',
    message: 'Page is for admin only. Please log in or contact administrator.'
  })
  return res.redirect('/login')
}
