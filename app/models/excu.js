module.exports = function(sequelize, Sequelize){
    var Excu = sequelize.define('excu', {
        name: {
            type: Sequelize.TEXT
        },

        age_rate: {
            type: Sequelize.TEXT
        },

        employeeId: {
            type: Sequelize.INTEGER
        },

        duration: {
            type: Sequelize.TEXT
        }
    }, {timestamps: false});

    /*Employee.associate = (models) => {
        Employee.belongsToMany(models.depart, {
            through: 'models.employee_joins',
            as: 'depart',
            foreignKey: 'id'
        })     
    }*/

    return Excu;
};