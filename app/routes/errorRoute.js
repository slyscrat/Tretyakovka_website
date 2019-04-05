var errorController = require('../controllers/errorController');

module.exports = function(app,passport){
    app.get('/error', errorController.error);
}