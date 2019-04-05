module.exports = function(sequelize, Sequelize){
    var Exhi = sequelize.define('exhi', {
        name:{
            type: Sequelize.TEXT,
            notEmpty: true
        },

        start_date:{
            type: Sequelize.DATEONLY,
        },

        end_date:{
            type: Sequelize.DATEONLY,
        },

        buildId:{
            type: Sequelize.INTEGER
        }

    }, {timestamps: false});
    return Exhi;
};
