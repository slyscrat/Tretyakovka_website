var employeesController = require('../controllers/employeesController.js');
var addFunc = require('./addFuncs.js');

module.exports = function(app, passport) {
    app.get('/employees', changer, addFunc.gettingData, employeesController.employees);
    app.post('/employees', addFunc.toDo, addFunc.redirect)
}

function changer(req, res, next){
    req.entity = '../data/employeeCRUD';
    return next();
}