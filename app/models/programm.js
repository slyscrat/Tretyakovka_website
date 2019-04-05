module.exports = function(sequelize, Sequelize){
    var Programm = sequelize.define('programm', {
        name: {
            type: Sequelize.TEXT
        },

        employeeId: {
            type: Sequelize.INTEGER
        },

        s_time: {
            type: Sequelize.TIME
        },

        e_time: {
            type: Sequelize.TIME
        },

        prog_sortId: {
            type: Sequelize.INTEGER
        }
    }, {timestamps: false});
    return Programm;
};