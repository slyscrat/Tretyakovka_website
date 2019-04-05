module.exports = function(sequelize, Sequelize){
    var Picture = sequelize.define('picture', {
        name:{
            type: Sequelize.TEXT,
            notEmpty: true
        },

        author:{
            type: Sequelize.TEXT,
        },

        year:{
            type: Sequelize.CHAR(4)
        },

        exhiId:{
            type: Sequelize.INTEGER
        },

        category:{
            type: Sequelize.TEXT
        },

        image:{
            type: Sequelize.TEXT
        }
    }, {timestamps: false});
    return Picture;
};
