var exports = module.exports = {}
exports.clean_log = function(req, res) {
    req.session.message = '';
}