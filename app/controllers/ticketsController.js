var cleaner = require('./clean.js');
var exports = module.exports = {}

exports.tickets = function(req, res) {
    res.render('tickets', {user: req.user, message: req.session.message, result: req.result});
    cleaner.clean_log(req);
}