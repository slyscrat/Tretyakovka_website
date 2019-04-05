var programmsController = require('../controllers/programmsController.js');
var addFunc = require('./addFuncs.js');

module.exports = function(app, passport) {

    app.get('/programms', changer, addFunc.gettingData, programmsController.programms);
    app.post('/programms', addFunc.toDo, addFunc.redirect)
}

function changer(req, res, next){
    req.entity = '../data/programmCRUD';
    return next();
}