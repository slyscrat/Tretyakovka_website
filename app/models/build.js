module.exports = function(sequelize, Sequelize){
    var Build = sequelize.define('build', {
        address:{
            type: Sequelize.TEXT,            
        },

        start_time:{
            type: Sequelize.TIME,
        },

        end_time:{
            type: Sequelize.TIME,
        }
    }, {timestamps: false});
    return Build;
};