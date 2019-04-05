var Ticket = require('../models/index.js').ticket;
var models = require("../models");
var Join_ticket = require("../models").join_ticket;

module.exports.select = function(req, res, callback){
    
    Ticket.findOne({
        where:{
            id: req.query.id
        }
    }).then(function(ticket){
        if (!ticket){
            req.session.message = "Билет с ид = " + req.query.id +" не найден!";
            req.session.messages = [];
            console.log("Ticket not found");
            res.redirect("./error");
            return;
        }
        var data = ticket.get();
        callback(data);
    });
}

module.exports.update = function(req, res, next){

    Ticket.findOne({
        where: {
            id: req.body.id
        }
    }).then(function(ticket){
        if (!ticket){
            req.session.message = "Билет не найден!";
            req.session.messages = [];
            return next();
        }

        ticket.updateAttributes({
            visit_age: req.body.visit_age,
            visit_num: req.body.visit_num,
            price: req.body.price
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
    Ticket.findOne({
        where: {
            id: req.body.id
        }
    }).then(function(ticket){
        if(!ticket){
            req.session.message = "Билет \"" + req.body.visit_age + "\" не найден!";
            req.session.messages = [];
            console.log("Ticket to del not found");
            res.redirect("./error");
        } else {
            ticket.destroy();
        }
        return next();
    })
}

module.exports.create = function(req, res, next){
    var data = {
        visit_age: req.body.visit_age,
        visit_num: req.body.visit_num,
        price: req.body.price
    }
    Ticket.create(data);
    return next();
}

module.exports.all = function(req, res, callback){
    Ticket.findAll({
        order:
        [['visit_age', 'ASC']],
        }
    ).then(function(ticket){
        console.log(ticket);
        if (!ticket){
            req.session.message = "Ни один работник не найден!";
            req.session.messages = [];
            console.log("No any ticket");
            res.redirect("./");
            return;    
        }        
        callback(ticket);
    });
}