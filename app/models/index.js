"use strict";
 
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};
 
 
fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });
 
Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});
 
 
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.picture.belongsTo(db.exhi, {foreignKey: 'exhiId'});
db.exhi.hasMany(db.picture);

db.exhi.belongsTo(db.build, {foreignKey: 'buildId'});
db.build.hasMany(db.exhi);

/*db.help.belongsTo(db.friend);
db.friend.hasMany(db.help);

db.help.belongsTo(db.depart);
db.depart.hasMany(db.help);*/

db.depart.belongsToMany(db.friend, {through: db.help});
db.friend.belongsToMany(db.depart, {through: db.help});

db.depart.belongsTo(db.build, {foreignKey: 'buildId'});
db.build.hasMany(db.depart);

db.window.belongsTo(db.depart, {foreignKey: 'departId'});
db.depart.hasMany(db.window);

/*db.sale.belongsTo(db.window);
db.window.hasMany(db.sale);

db.sale.belongsTo(db.ticket);
db.ticket.hasMany(db.sale);*/

db.ticket.belongsToMany(db.window, {through: db.sale});
db.window.belongsToMany(db.ticket, {through: db.sale});

db.employee_join.belongsTo(db.depart, {foreignKey: 'departId'});
db.depart.hasMany(db.employee_join);

db.employee_join.belongsTo(db.employee, {foreignKey: 'employeeId'});
db.employee.hasMany(db.employee_join);

//db.employee.belongsToMany(db.depart, {through: db.employee_join, foreignKey: 'departId'}); //, foreignKey: 'employeeId'
//db.depart.belongsToMany(db.employee, {through: db.employee_join, foreignKey: 'employeeId'}); //, foreignKey: 'employeeId'

db.excu.belongsTo(db.employee, {foreignKey: 'employeeId'});
db.employee.hasOne(db.excu);

db.programm.belongsTo(db.prog_sort, {foreignKey: 'prog_sortId'});
db.prog_sort.hasMany(db.programm);

db.programm.belongsTo(db.employee, {foreignKey: 'employeeId'});
db.employee.hasOne(db.programm);

module.exports = db;