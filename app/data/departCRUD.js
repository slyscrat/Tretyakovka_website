var Depart = require('../models/index.js').depart;
var models = require('../models');
var Build = require('../models').build;

module.exports.select = function(req, res, callback){

    Depart.findOne({
        where:{
            id: req.query.id
        }
    }).then(function(depart){
        if (!depart){
            req.session.message = "Отдел с ид = \""+ req.query.id +"\" не найден!";
            req.session.messages = [];
            console.log("Depart not found");
            res.redirect("./error");
            return;
        }
        var data = depart.get();
        callback(data);
    });
}

module.exports.update = function(req, res, next){
let value;
    Build.findOne({where: {address: req.body.buildAddress}})
        .then(function(build){
            if (!build){
                req.session.message = "Обновление не завершено. Здание не найдено!";
                console.log('Failed to find build');
                req.session.messages = [];
                return next();
            }
           value = build;
           console.log(value);
        })
        
        .then(Depart.findOne({
            include: [models.build],
            where: {
                id: req.body.id
            }
        })
        
        .then(function(depart){
            if (!depart){
                req.session.message = "Отдел не найден!";
                req.session.messages = [];
                console.log("No departs");
                return next();
            }
            console.log(value);
            depart.updateAttributes({
                mission: req.body.mission,
                buildId: value.id
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
    Depart.findOne({
        where: {
            id: req.body.id
        }
    }).then(function(depart){
        if(!depart){
            req.session.message = "Отдел с id = \"" + req.body.id + "\" не найден!";
            req.session.messages = [];
            console.log("Depart to del not found");
            res.redirect("./error");
        } else {
            depart.destroy();
        }
        return next();
    })
}

module.exports.create = function(req, res, next){
    let value;
    Build.findOne({where: {address: req.body.buildAddress}})
        .then(function(build){
            if (!build){
                req.session.message = "Обновление не завершено. Здание не найдено!";
                console.log('Failed to find build');
                req.session.messages = [];
                return next();
            }
           value = build;
        })
        
        .then(Depart.findOne({
            include: [models.build],
            where: {
                id: req.body.id
            }
        })

    .then(function(depart){
        if(depart){
            req.session.message = "Отдел уже существует!";
            req.session.messages = [];
            console.log("Depart already exist");
        } else {
            var data = {
                mission: req.body.mission,
                buildId: value.id             
            }
            Depart.create(data);          
        }
        return next();
    }))
}

module.exports.all = function(req, res, callback){
    Depart.findAll({
        order:
        [['mission', 'ASC']],
        include: [models.build]
    }).then(function(departs){
        if (!departs){
            req.session.message = "Ни один отдел не найден!";
            req.session.messages = [];
            console.log("No any departs");
            res.redirect("./");
            return;    
        }
        callback(departs);
    });
}