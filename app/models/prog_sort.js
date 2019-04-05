module.exports = function(sequelize, Sequelize){
    var Prog_sort = sequelize.define('prog_sort', {
        name:{
            type: Sequelize.TEXT,            
        }
    }, {timestamps: false});
    return Prog_sort;
};