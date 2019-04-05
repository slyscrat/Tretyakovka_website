var cleaner = require('./clean.js');
var exports = module.exports = {}

exports.exhis = function(req, res) {
    res.render('exhibitions', {user: req.user, message: req.session.message, result: req.result});
    cleaner.clean_log(req);
}