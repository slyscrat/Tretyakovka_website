module.exports = function(sequelize, Sequelize){
    var Window = sequelize.define('window', {
        departId: {
            type: Sequelize.INTEGER
        }
    }, {timestamps: false});
    return Window;
};