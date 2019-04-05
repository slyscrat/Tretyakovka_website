var Employej = require('../models').employee_join;
var models = require('../models');
var Employee = require('../models').employee;
var Depart = require('../models').depart;

/*module.exports.select = function(req, res, callback){

    Employee.findOne({
        include: [{model:models.employee, attributes:['id', 'name']}, {model:models.depart, attributes:['id','mission']}],
        where:{
            departId: req.query.id,
            employeeId: req.
        }
    }).then(function(picture){
        if (!picture){
            req.session.message = "Картина с ид = " + req.query.id +" не найдена!";
            req.session.messages = [];
            console.log("Employee join not found");
            res.redirect("./error");
            return;
        }
        var data = picture.get();
        callback(data);
    });
}*/

/*module.exports.update = function(req, res, next){
let value;
    Employee.findOne({where: {name: req.body.employeeName}})
        .then(function(employee){
            if (!employee){
                req.session.message = "Обновление не завершено. Работники не найдены!";
                console.log('Failed to find employees');
                req.session.messages = [];
                return next();
            }
           value = employee;
        })
        
        .then(Depart.findOne({where: {name: req.body.departName}})
        .then(Employej.findOne({where}))
        .then(function(picture){
            if (!picture){
                req.session.message = "Картина не найдена!";
                req.session.messages = [];
                console.log("No pictures");
                return next();
            }
            picture.updateAttributes({
                name: req.body.name,
                author: req.body.author,
                exhiId: value.id,
                year: req.body.year,
                category: req.body.category
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
}*/

module.exports.delete = function(req, res, next){
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

        .then(Depart.findOne({where:{mission: req.body.mission}})
        .then(function(depart){
            if(!depart){
                req.session.message = "Обновление не завершено. Вид программы не найден!";
                console.log('Failed to find prog_sort');
                req.session.messages = [];
                return next();
            }
            value1 = depart;
        })
        
        .then(Employej.findOne({
            include: [{model:models.employee, attributes:['id', 'name']}, {model:models.depart, attributes:['id', 'mission']}],
            where: {
                '$employee.name$': req.body.employeeName,
                '$depart.mission$': req.body.mission
            }
        })

        .then(function(employej){
            if(!employej){
                req.session.message = "Привязка не найдена!";
                req.session.messages = [];
                console.log("Employee join to del not found");
                res.redirect("./error");
            } else {
                employej.destroy();
            }
            return next();
        })))


    /*Employee.findOne({where: {name: req.body.employeeName}})
        .then(function(employee){
            if (!employee){
                req.session.message = "Обновление не завершено. Рабочий не найден!";
                console.log('Failed to find employee');
                req.session.messages = [];
                return next();
            }
           value = employee;
        })
        .then(Depart.findOne({where: {mission: req.body.mission}})
            .then(function(depart){
                if (!depart){
                    req.session.message = "Обновление не завершено. Отдел не найден!";
                    console.log('Failed to find depart');
                    req.session.messages = [];
                    return next();
                }
            value1 = depart;
        }))
    Employej.findOne({
        where: {
            departId: value.id,
            employeeId: value1.id
        }
    }).then(function(employej){
        if(!employej){
            req.session.message = "Привязка не найдена!";
            req.session.messages = [];
            console.log("Employee join to del not found");
            res.redirect("./error");
        } else {
            employej.destroy();
        }
        return next();
    })*/
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

        .then(Depart.findOne({where:{mission: req.body.mission}})
        .then(function(depart){
            if(!depart){
                req.session.message = "Обновление не завершено. Вид программы не найден!";
                console.log('Failed to find prog_sort');
                req.session.messages = [];
                return next();
            }
            value1 = depart;
        })
        
        .then(Employej.findOne({
            include: [{model:models.employee, attributes:['id', 'name']}, {model:models.depart, attributes:['id', 'mission']}],
            where: {
                '$employee.name$': req.body.employeeName,
                '$depart.mission$': req.body.mission
            }
        })

        .then(function(employej){
            if(employej){
                req.session.message = "Привязка уже существует!";
                req.session.messages = [];
                console.log("Employee join already exist");
            } else {
                var data = {
                    employeeId: value.id,
                    departId: value1.id
                }
                Employej.create(data);          
            }
            return next();
        })))
/*
    Employee.findOne({where: {name: req.body.employeeName}})
        .then(function(employee){
            if (!employee){
                req.session.message = "Обновление не завершено. Рабочий не найден!";
                console.log('Failed to find employee');
                req.session.messages = [];
                return next();
            }
           value = employee;
        })
        .then(Depart.findOne({where: {mission: req.body.mission}})
            .then(function(depart){
                if (!depart){
                    req.session.message = "Обновление не завершено. Отдел не найден!";
                    console.log('Failed to find depart');
                    req.session.messages = [];
                    return next();
                }
            value1 = depart;
        }))
        .then(Employej.findOne({
            include: [{model:models.employee, attributes:['id', 'name']}, {model:models.depart, attributes:['id', 'mission']}],
            where: {
                employeeId: req.body.employeeId,
                departId: req.body.departId
            }
        })

    .then(function(employej){
        if(employej){
            req.session.message = "Привязка уже существует!";
            req.session.messages = [];
            console.log("Employee join already exist");
        } else {
            var data = {
                employeeId: value.id,
                departId: value1.id
            }
            Employej.create(data);          
        }
        return next();
    }))*/
}

module.exports.all = function(req, res, callback){
    Employej.findAll({
        include: [{model:models.employee, attributes:['id', 'name']}, {model:models.depart, attributes:['id', 'mission']}],
        order: [[models.employee.name, 'name']]
    }).then(function(employej){
        if (!employej){
            req.session.message = "Ни одной привязки не найдено!";
            req.session.messages = [];
            console.log("No any employee join");
            res.redirect("./");
            return;    
        }
        callback(employej);
    });
}