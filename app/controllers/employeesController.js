var cleaner = require('./clean.js');
var exports = module.exports = {}

exports.employees = function(req, res) {
    res.render('employees', {user: req.user, message: req.session.message, result: req.result});
    cleaner.clean_log(req);
}