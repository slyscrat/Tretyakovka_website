var cleaner = require('./clean.js');
var exports = module.exports = {}

exports.signup = function(req, res) {
    res.render('signup', {signup_error: req.session.message});
    cleaner.clean_log(req);
}
exports.signin = function(req, res) {
    res.render('signin', {signin_error: req.session.message});
    cleaner.clean_log(req);
}
exports.dashboard = function(req, res) {
    res.render('dashboard', {user: req.user, dashboard_message: req.session.message});
    cleaner.clean_log(req);
}
exports.main = function(req, res) {
    res.render('main', {user: req.user});
    cleaner.clean_log(req);
}
exports.error = function(req, res){
    res.render('error', {user: req.user, error: req.session.message});
}
exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            res.status(500);
        }
        res.redirect('/signin');
    })
}