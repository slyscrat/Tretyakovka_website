var cleaner = require('./clean.js');
var exports = module.exports = {}

exports.error = function(req, res) {
    res.render('error', {user: req.user, error: req.session.message});
    cleaner.clean_log(req);
}