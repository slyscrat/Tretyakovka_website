var Employee = require('../models/index.js').employee;
var models = require("../models");
var Join_employee = require("../models").join_employee;

module.exports.select = function(req, res, callback){
    
    Employee.findOne({
        where:{
            id: req.query.id
        }
    }).then(function(employee){
        if (!employee){
            req.session.message = "Работник с ид = " + req.query.id +" не найден!";
            req.session.messages = [];
            console.log("Employee not found");
            res.redirect("./error");
            return;
        }
        var data = employee.get();
        callback(data);
    });
}

module.exports.update = function(req, res, next){

    Employee.findOne({
        where: {
            id: req.body.id
        }
    }).then(function(employee){
        if (!employee){
            req.session.message = "Работник не найден!";
            req.session.messages = [];
            return next();
        }

        employee.updateAttributes({
            name: req.body.name,
            salary: req.body.salary
        }).then(function(){
            req.session.message = 'Успешно обновлено!';
            req.session.messages = [];
            return next();
        }).catch(function(err){
            console.log("Error", err);
            req.session.message = 'Возникла ошибка во время изменения. Пожалуйста, повторите попытку позже.';
            req.session.messages = [];
            return next();
        })
    });
};

module.exports.delete = function(req, res, next){
    Employee.findOne({
        where: {
            id: req.body.id
        }
    }).then(function(employee){
        if(!employee){
            req.session.message = "Работник \"" + req.body.name + "\" не найден!";
            req.session.messages = [];
            console.log("Employee to del not found");
            res.redirect("./error");
        } else {
            employee.destroy();
        }
        return next();
    })
}

module.exports.create = function(req, res, next){
    var data = {
        name: req.body.name,
        salary: req.body.salary
    }
    Employee.create(data);
    return next();
}

module.exports.all = function(req, res, callback){
    Employee.findAll({
        order:
        [['name', 'ASC']],
        //model: models.depart,
        //attributes: ['id', 'mission'],
        /*include: [{
            model: models.depart,
            through: {
                attributes: ['']
            }
        }]*/
        }
    ).then(function(employee){
        console.log(employee);
        if (!employee){
            req.session.message = "Ни один работник не найден!";
            req.session.messages = [];
            console.log("No any employee");
            res.redirect("./");
            return;    
        }
        console.log(employee[0]);
        callback(employee);
    });
}