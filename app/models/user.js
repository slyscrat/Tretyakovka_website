module.exports = function(sequelize, Sequelize){
    var User = sequelize.define('user', {
        name:{
            type: Sequelize.STRING,
            notEmpty: true
        },

        email:{
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },

        password:{
            type: Sequelize.STRING,
            allowNull: false
        },

        role:{
            type: Sequelize.TEXT
        },

        photoUrl:{
            type: Sequelize.TEXT
        },

        vk_id:{
            type:Sequelize.INTEGER
        },

        tw_id:{
            type:Sequelize.STRING
        },

        achieves:{
            type: Sequelize.TEXT
        }
    });
    return User;
};
