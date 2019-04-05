module.exports = function(sequelize, Sequelize){
    var Employee_join = sequelize.define('employee_join', {
        employeeId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },

        departId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    }, {timestamps: false});
    return Employee_join;
};