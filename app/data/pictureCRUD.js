var Picture = require('../models/index.js').picture;
var models = require('../models');
var Exhi = require('../models').exhi;

module.exports.select = function(req, res, callback){
    Picture.findAll({
        include: [{model:models.exhi, attributes:['id', 'name']}],
        where:{
            exhiId: req.query.exhiId
        }
    }).then(function(picture){
        if (!picture){
            req.session.message = "Картина для данной онлайн-экскурсии не найдена!";
            req.session.messages = [];
            console.log("Picture with such excu not found");
            res.redirect("./error");
            return;
        }        
        callback(picture);
    });
}

module.exports.update = function(req, res, next){
let value;
    Exhi.findOne({where: {name: req.body.exhiName}})
        .then(function(exhi){
            if (!exhi){
                req.session.message = "Обновление не завершено. Выставка не найдена!";
                console.log('Failed to find exhibition');
                req.session.messages = [];
                return next();
            }
           value = exhi;
        })
        
        .then(Picture.findOne({
            include: [{model:models.exhi, attributes:['id', 'name']}],
            where: {
                id: req.body.id
            }
        })
        
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
}

module.exports.delete = function(req, res, next){
    Picture.findOne({
        where: {
            name: req.body.name,
            author: req.body.author,
            year: req.body.year,
            category: req.body.category
        }
    }).then(function(picture){
        if(!picture){
            req.session.message = "Картина \"" + req.body.name + "\" не найдена!";
            req.session.messages = [];
            console.log("Picture to del not found");
            res.redirect("./error");
        } else {
            picture.destroy();
        }
        return next();
    })
}

module.exports.create = function(req, res, next){
    let value;
    Exhi.findOne({where: {name: req.body.exhiName}})
        .then(function(exhi){
            if (!exhi){
                req.session.message = "Обновление не завершено. Выставка не найдена!";
                console.log('Failed to find exhibition');
                req.session.messages = [];
                return next();
            }
           value = exhi;
        })
        
        .then(Picture.findOne({
            include: [{model:models.exhi, attributes:['id', 'name']}],
            where: {
                id: req.body.id
            }
        })

    .then(function(picture){
        if(picture){
            req.session.message = "Картина уже существует!";
            req.session.messages = [];
            console.log("Picture already exist");
        } else {
            var data = {
                name: req.body.name,
                author: req.body.author,
                exhiId: value.id,
                year: req.body.year,
                category: req.body.category
            }
            Picture.create(data);          
        }
        return next();
    }))
}

module.exports.all = function(req, res, callback){
    Picture.findAll({
        order:
        [['name', 'ASC']],
        include: [{model:models.exhi, attributes:['id', 'name']}]
    }).then(function(pictures){
        if (!pictures){
            req.session.message = "Ни одной картины не найдено!";
            req.session.messages = [];
            console.log("No any pictures");
            res.redirect("./");
            return;    
        }
        callback(pictures);
    });
}