var Exhi = require('../models/index.js').exhi;
var models = require('../models');
var Build = require('../models').build;

module.exports.select = function(req, res, callback){

    Exhi.findOne({
        include: [{model: models.build, attributes: ['id', 'address']}],
        where:{
            id: req.query.id
        }
    }).then(function(exhi){
        if (!exhi){
            req.session.message = "Выставка с ид = " + req.query.id +" не найдена!";
            req.session.messages = [];
            console.log("Exhi not found");
            res.redirect("./error");
            return;
        }
        var data = exhi.get();
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
        })
        
        .then(Exhi.findOne({
            include: [{model: models.build, attributes: ['id', 'address']}],
            where: {
                id: req.body.id
            }
        })
        
        .then(function(exhi){
            if (!exhi){
                req.session.message = "Выставка не найдена!";
                req.session.messages = [];
                console.log("No exhis");
                return next();
            }
            console.log(value);
            exhi.updateAttributes({
                name: req.body.name,
                start_date: req.body.start_date,
                buildId: value.id,
                end_date: req.body.end_date,
                
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
    Exhi.findOne({
        where: {
            name: req.body.name,
            start_date: req.body.start_date,
            end_date: req.body.end_date
        }
    }).then(function(exhi){
        if(!exhi){
            req.session.message = "Выставка \"" + req.body.name + "\" не найдена!";
            req.session.messages = [];
            console.log("Exhi to del not found");
            res.redirect("./error");
        } else {
            exhi.destroy();
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
        
        .then(Exhi.findOne({
            include: [{model: models.build, attributes: ['id', 'address']}],
            where: {
                id: req.body.id
            }
        })

    .then(function(exhi){
        if(exhi){
            req.session.message = "Выставка уже существует!";
            req.session.messages = [];
            console.log("Exhi already exist");
        } else {
            var data = {
                name: req.body.name,
                start_date: req.body.start_date,
                buildId: value.id,
                end_date: req.body.end_date                
            }
            Exhi.create(data);          
        }
        return next();
    }))
}

module.exports.all = function(req, res, callback){
    Exhi.findAll({
        order:
        [['name', 'ASC']],
        include: [{model: models.build, attributes: ['id', 'address']}]
    }).then(function(exhis){
        if (!exhis){
            req.session.message = "Ни одной выставки не найдено!";
            req.session.messages = [];
            console.log("No any exhis");
            res.redirect("./");
            return;    
        }
        callback(exhis);
    });
}