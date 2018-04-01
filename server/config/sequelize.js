var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var _ = require('lodash');
var config = require('./sequelizeConfig');
var db = {};
var master_db = {};

// Company Database: create your instance of sequelize
var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    port: config.db.port,
    dialect: 'mysql',
    storage: config.db.storage,
    logging: false,
    timezone: 'Etc/GMT'
});


/*************** Company Database Reading Model Files: Start ************************/

//loop through all files in models directory ignoring hidden files and this file
fs.readdirSync(config.modelsDir.path)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file !== 'data') && (file !== 'master_database');
    })
//import model files and save model names
.forEach(function(file) {

    //console.log('Loading model file ' + file);
    var model = sequelize.import(path.join(config.modelsDir.path, file));
    db[model.name] = model;

});


module.exports = {
    db: sequelize
};