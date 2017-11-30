exports.index = function(req, res, next) {
  res.render('users', { title: 'Users Lists'});
}
exports.signup = function(req, res, next) {
  res.render('signup', { title: 'Sing Up'});
}
