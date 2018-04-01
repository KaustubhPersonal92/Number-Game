'use strict';

var siteUser = require('../controller/userController');

module.exports = function(app) {
    
    app.post('/api/site/addUser', siteUser.addUserInfo);

    app.post('/api/site/login', siteUser.userAuthenication);

    app.post('/api/site/sendEmail', siteUser.sendEmailUser);

};