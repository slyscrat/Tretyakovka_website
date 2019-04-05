var picturesController = require('../controllers/picturesController.js');
var addFunc = require('./addFuncs.js');
// поменял
module.exports = function(app, passport) {
    //add to get addFunc.isLoggedIn
    app.get('/pictures', changer, addFunc.selectData, picturesController.pictures);
    app.post('/pictures', addFunc.isLoggedIn, addFunc.toDo, addFunc.redirect)
}

function changer(req, res, next){
    req.entity = '../data/pictureCRUD';
    return next();
}