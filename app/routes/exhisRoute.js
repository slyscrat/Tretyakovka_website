var exhisController = require('../controllers/exhisController.js');
var addFunc = require('./addFuncs.js');

module.exports = function(app, passport) {
    app.get('/exhibitions', changer, addFunc.gettingData, exhisController.exhis);
    app.post('/exhibitions', addFunc.toDo, addFunc.redirect);
}

function changer(req, res, next){
    req.entity = '../data/exhiCRUD';
    return next();
}