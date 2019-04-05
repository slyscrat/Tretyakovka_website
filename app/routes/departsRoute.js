var departsController = require('../controllers/departsController.js');
var addFunc = require('./addFuncs.js');

module.exports = function(app, passport) {
    app.get('/departs', changer, addFunc.gettingData, departsController.departs);
    app.post('/departs', addFunc.toDo, addFunc.redirect)
}

function changer(req, res, next){
    req.entity = '../data/departCRUD';
    return next();
}