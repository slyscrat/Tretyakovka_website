var cleaner = require('./clean.js');
var exports = module.exports = {}

exports.manyToMany = function(req, res) {
    res.render('manyToMany', {user: req.user, message: req.session.message, result: req.result});
    cleaner.clean_log(req);
}