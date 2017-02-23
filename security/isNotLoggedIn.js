module.exports = function (req, res, next) {
  console.log('************************');
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) return next()

  req.flash('flash', {
    type: 'danger',
    message: 'Page is for admin only. Please log in or contact administrator.'
  })
  return res.redirect('/login')
}
