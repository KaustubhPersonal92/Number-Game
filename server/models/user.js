var async = require('async');
module.exports = function(sequelize, DataTypes) {

    var user = sequelize.define('user', 
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING
        }, 
        {
            freezeTableName: true,
            tableName: 'user',
            timestamps: false,     
            paranoid: true,
        }
    );
    return user;
};
