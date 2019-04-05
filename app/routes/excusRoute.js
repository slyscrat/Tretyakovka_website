var excusController = require('../controllers/excusController.js');
var addFunc = require('./addFuncs.js');

module.exports = function(app, passport) {
    app.get('/excursions', changer, addFunc.gettingData, excusController.excus);
    app.post('/excursions', addFunc.toDo, addFunc.redirect)
}

function changer(req, res, next){
    req.entity = '../data/excuCRUD';
    return next();
}