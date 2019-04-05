var exports = module.exports = {}
var add = require('./addFuncs.js');
var action = require('../data/programmCRUD.js');
var Action = action.all;

exports.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/signin');
}

exports.Assign = function(req, res, callback){
    Action(req, res, function(data){
        callback(data);
        req.result = data;
    })
}

exports.gettingData = function(req, res, next){
    action = require(req.entity);
    console.log(req.entity);
    Action = action.all;
    add.Assign(req, res, function(result){
        req.result = result;
        return next();
    })
}
// добавил
exports.selectData = function(req, res, next){
    action = require(req.entity);
    console.log(req.entity);
    Action = action.select;
    if (req.query.exhiId == "" || Number.isNaN(+req.query.exhiId)) {
        //console.log("Result is: " + result);    
        req.session.message = "Pictures with excu id = " + req.query.id +" doesn't exist";
        req.session.messages = [];
        console.log("Pictures in such excu not found");
        res.redirect("./error");
        return;
    }
    add.Assign(req, res, function(result){
        req.result = result;
        return next();
    })
}

exports.redirect = function(req, res, next){
    res.redirect(req.url);
    return next();
}

exports.toDo = function(req, res, next){
    if (req.body.action == "Delete"){
        Action = action.delete;
    } else if (req.body.action == "Update") {
        Action = action.update;
    } else if (req.body.action == "Add") {
        Action = action.create;
    }
    Action(req, res, next);
}