var ticketsController = require('../controllers/ticketsController.js');
var addFunc = require('./addFuncs.js');

module.exports = function(app, passport) {
    app.get('/tickets', changer, addFunc.gettingData, ticketsController.tickets);
    app.post('/tickets', addFunc.toDo, addFunc.redirect)
}

function changer(req, res, next){
    req.entity = '../data/ticketsCRUD';
    return next();
}