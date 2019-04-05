module.exports = function(sequelize, Sequelize){
    var Ticket = sequelize.define('ticket', {
        visit_num: {
            type: Sequelize.TEXT
        },

        visit_age: {
            type: Sequelize.TEXT
        },

        price:{
            type: Sequelize.INTEGER
        }
    }, {timestamps: false});
    return Ticket;
};