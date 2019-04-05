module.exports = function(sequelize, Sequelize){
    var Depart = sequelize.define('depart', {
        mission: {
            type: Sequelize.TEXT
        },

        buildId: {
            type: Sequelize.INTEGER
        }
    }, {timestamps: false});
    return Depart;
};