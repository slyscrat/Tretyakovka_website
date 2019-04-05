var cleaner = require('./clean.js');
var exports = module.exports = {}

exports.pictures = function(req, res) {
    res.render('pictures', {user: req.user, message: req.session.message, result: req.result});
    cleaner.clean_log(req);
}