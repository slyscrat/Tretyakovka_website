module.exports = function(sequelize, Sequelize){
    var Friend = sequelize.define('friend', {
        name:{
            type: Sequelize.TEXT,            
        },

        friend_sort:{
            type: Sequelize.TEXT,
        }
    }, {timestamps: false});
    return Friend;
};