var Programm = require('../models/index.js').programm;
var models = require('../models');
var Employee = require('../models').employee;
var Prog_sort = require('../models').prog_sort;

module.exports.select = function(req, res, callback){

    Programm.findOne({
        include: [{model:models.employee, attributes:['id', 'name']}, models.prog_sort],
        where:{
            id: req.query.id
        }
    }).then(function(programm){
        if (!programm){
            req.session.message = "Программа с ид = " + req.query.id +" не найдена!";
            req.session.messages = [];
            console.log("Programm not found");
            res.redirect("./error");
            return;
        }
        var data = programm.get();
        callback(data);
    });
}

module.exports.update = function(req, res, next){
let value;
let value1;
    Employee.findOne({where: {name: req.body.employeeName}})
        .then(function(employee){
            if (!employee){
                req.session.message = "Обновление не завершено. Работник не найден!";
                console.log('Failed to find employee');
                req.session.messages = [];
                return next();
            }
           value = employee;
        })

        .then(Prog_sort.findOne({where:{name: req.body.prog_sortName}})
        .then(function(prog_sort){
            if(!prog_sort){
                req.session.message = "Обновление не завершено. Вид программы не найден!";
                console.log('Failed to find prog_sort');
                req.session.messages = [];
                return next();
            }
            value1 = prog_sort;
        })
        
        .then(Programm.findOne({
            include: [{model:models.employee, attributes:['id', 'name']}, models.prog_sort],
            where: {
                id: req.body.id
            }
        })
        
        .then(function(programm){
            if (!programm){
                req.session.message = "Программа не найдена!";
                req.session.messages = [];
                console.log("No programms");
                return next();
            }
            programm.updateAttributes({
                name: req.body.name,
                s_time: req.body.s_time,
                e_time: req.body.e_time,
                e_time: req.body.e_time,
                employeeId: value.id,
                prog_sortId: value1.id
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
    })))
}

module.exports.delete = function(req, res, next){
    Programm.findOne({
        where: {
            name: req.body.name,
            s_time: req.body.s_time,
            e_time: req.body.e_time
        }
    }).then(function(programm){
        if(!programm){
            req.session.message = "Программа \"" + req.body.name + "\" не найдена!";
            req.session.messages = [];
            console.log("Programm to del not found");
            res.redirect("./error");
        } else {
            programm.destroy();
        }
        return next();
    })
}

module.exports.create = function(req, res, next){
    let value;
    let value1;
    Employee.findOne({where: {name: req.body.employeeName}})
        .then(function(employee){
            if (!employee){
                req.session.message = "Обновление не завершено. Работник не найден!";
                console.log('Failed to find employee');
                req.session.messages = [];
                return next();
            }
           value = employee;
        })

        .then(Prog_sort.findOne({where:{name: req.body.prog_sortName}})
        .then(function(prog_sort){
            if(!prog_sort){
                req.session.message = "Обновление не завершено. Вид программы не найден!";
                console.log('Failed to find prog_sort');
                req.session.messages = [];
                return next();
            }
            value1 = prog_sort;
        })
        
        .then(Programm.findOne({
            include: [{model:models.employee, attributes:['id', 'name']}, models.prog_sort],
            where: {
                id: req.body.id
            }
        })

    .then(function(programm){
        if(programm){
            req.session.message = "Программа уже существует!";
            req.session.messages = [];
            console.log("Programm already exist");
        } else {
            var data = {
                name: req.body.name,
                s_time: req.body.s_time,
                e_time: req.body.e_time,
                employeeId: value.id,
                prog_sortId: value1.id
            }
            Programm.create(data);          
        }
        return next();
    })))
}

module.exports.all = function(req, res, callback){
    Programm.findAll({
        order:
        [['name', 'ASC']],
        include: [{model:models.employee, attributes:['id', 'name']}, models.prog_sort]
    }).then(function(programms){
        if (!programms){
            req.session.message = "Ни одной программы не найдено!";
            req.session.messages = [];
            console.log("No any programms");
            res.redirect("./");
            return;    
        }
        callback(programms);
    });
}