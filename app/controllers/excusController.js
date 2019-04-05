var cleaner = require('./clean.js');
var exports = module.exports = {}

exports.excus = function(req, res) {
    res.render('excursions', {user: req.user, message: req.session.message, result: req.result});
    cleaner.clean_log(req);
}