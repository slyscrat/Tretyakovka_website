var cleaner = require('./clean.js');
var exports = module.exports = {}

exports.departs = function(req, res) {
    res.render('departs', {message: req.session.message, user: req.user, result: req.result});
    cleaner.clean_log(req);
}