var cleaner = require('./clean.js');
var exports = module.exports = {}

exports.programms = function(req, res) {
    res.render('programms', {user: req.user, message: req.session.message, result: req.result});
    cleaner.clean_log(req);
}