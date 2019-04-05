var Excu = require('../models/index.js').excu;
var models = require('../models');
var Employee = require('../models').employee;

module.exports.select = function(req, res, callback){

    Excu.findOne({
        include: [{model: models.employee, attributes: ['id', 'name']}],
        where:{
            id: req.query.id
        }
    }).then(function(excu){
        if (!excu){
            req.session.message = "Экскурсия с ид = " + req.query.id +" не найдена!";
            req.session.messages = [];
            console.log("Excu not found");
            res.redirect("./error");
            return;
        }
        var data = excu.get();
        callback(data);
    });
}

module.exports.update = function(req, res, next){
let value;
    Employee.findOne({where: {name: req.body.guideName}})
        .then(function(employee){
            if (!employee){
                req.session.message = "Обновление не завершено. Экскурсовод не найден!";
                console.log('Failed to find guide');
                req.session.messages = [];
                return next();
            }
           value = employee;
        })
        
        .then(Excu.findOne({
            include: [{model: models.employee, attributes: ['id', 'name']}],
            where: {
                id: req.body.id
            }
        })
        
        .then(function(excu){
            if (!excu){
                req.session.message = "Экскурсия не найдена!";
                req.session.messages = [];
                console.log("No excursions");
                return next();
            }
            console.log(value);
            excu.updateAttributes({
                name: req.body.name,
                age_rate: req.body.age_rate,
                employeeId: value.id,
                duration: req.body.duration
            }).then(function(){
                req.session.message = 'Успешно обновлено!';
                req.session.messages = [];
                console.log("UPDATED!");
                return next();
            }).catch(function(err){
                console.log("Error", err);
                req.session.message = 'Возникла ошибка во время изменения. Пожалуйста, повторите попытку позже.';
                req.session.messages = [];
                return next();
            })
    }))
}

module.exports.delete = function(req, res, next){
    Excu.findOne({
        where: {
            name: req.body.name,
            age_rate: req.body.age_rate,
            //employeeId: req.body.employeeId,
            duration: req.body.duration
        }
    }).then(function(excu){
        if(!excu){
            req.session.message = "Экскурсия \"" + req.body.name + "\" не найдена!";
            req.session.messages = [];
            console.log("Excu to del not found");
            res.redirect("./error");
        } else {
            excu.destroy();
        }
        return next();
    })
}

module.exports.create = function(req, res, next){
    let value;
    console.log(req.body.guideName);
    Employee.findOne({where: {name: req.body.guideName}})
        .then(function(employee){
            if (!employee){
                req.session.message = "Обновление не завершено. Экскурсовод не найден!";
                console.log('Failed to find guide');
                req.session.messages = [];
                return next();
            }
           value = employee;
        })
        
        .then(Excu.findOne({
            include: [{model: models.employee, attributes: ['id', 'name']}],
            where: {
                id: req.body.id
            }
        })

    .then(function(excu){
        if(excu){
            req.session.message = "Экскурсия уже существует!";
            req.session.messages = [];
            console.log("Excu already exist");
        } else {
            var data = {
                name: req.body.name,
                age_rate: req.body.age_rate,
                employeeId: value.id,
                duration: req.body.duration
            }
            Excu.create(data);          
        }
        return next();
    }))
}

module.exports.all = function(req, res, callback){
    Excu.findAll({
        order:
        [['name', 'ASC']],
        include: [{model: models.employee, attributes: ['id', 'name']}]
    }).then(function(excus){
        if (!excus){
            req.session.message = "Ни одной экскурсии не найдено!";
            req.session.messages = [];
            console.log("No any excus");
            res.redirect("./");
            return;    
        }
        callback(excus);
    });
}