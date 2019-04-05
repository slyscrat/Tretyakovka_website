var manyToManyController = require('../controllers/manyToManyController.js');
var addFunc = require('./addFuncs.js');

module.exports = function(app, passport) {
    app.get('/manyToMany', changer, addFunc.gettingData, manyToManyController.manyToMany);
    app.post('/manyToMany', addFunc.toDo, addFunc.redirect)
}

function changer(req, res, next){
    req.entity = '../data/manyToManyCRUD';
    return next();
}