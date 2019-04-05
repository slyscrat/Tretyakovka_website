module.exports = function(sequelize, Sequelize){
    var Help = sequelize.define('help', {
        friendId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },

        departId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        
        help_type: {
            type: Sequelize.TEXT
        }
    }, {timestamps: false});
    return Help;
};