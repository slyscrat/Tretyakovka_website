module.exports = function(sequelize, Sequelize){
    var Sale = sequelize.define('sale', {
        ticketId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },

        windowId:{
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    }, {timestamps: false});
    return Sale;
};