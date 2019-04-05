//var models = require('../models');

module.exports = function(sequelize, Sequelize){
    var Employee = sequelize.define('employee', {
        name: {
            type: Sequelize.TEXT
        },

        salary: {
            type: Sequelize.INTEGER
        }
    }, {timestamps: false});
    


    /*Employee.associate = (models) => {
        Employee.belongsToMany(models.depart, {
            through: models.employee_joins,
            as: 'depart',
            foreignKey: 'id'
        })     
    }*/



    /*db.employee.belongsToMany(db.depart, {through: db.employee_join});
    db.depart.belongsToMany(db.employee, {through: db.employee_join});*/

    return Employee;
};