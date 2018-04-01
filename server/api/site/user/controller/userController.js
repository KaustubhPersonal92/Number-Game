 'use strict';

var db = require('../../../../config/sequelize').db;
var generalConfig = require('../../../../config/generalConfig');
var email = require('nodemailer');

/**
 * addUser will add user into db
 * @param  {obj}   req
 * @param  {obj}   res
 * @return json for fail or success notification
*/
exports.addUserInfo = function(req, res) {
    checkEmailExist(req.body.email, function (response) {
        if(response.status == 200) {
            db.models.user.create(req.body).then(function(user) {
                if(user) {
                    res.json({
                        status: 200,
                        data: [],
                        message: 'User registartion has been done successfully.'
                    });
                }
                else {
                    res.json({
                        status: 401,
                        data: null,
                        message: 'Failed to registered user.'
                    });
                }
            });     
        } else{
            res.json({
                status: response.status,
                data: response.data,
                message: response.message
            });
        }
    })  
};


/**
 * checkEmailExist will check if email exist or not
 * @param  {obj}   email
 * @param  {obj}   callback
 * @return json for fail or success notification
*/
var checkEmailExist = function(email, callback) {
    db.models.user.findOne({
      where: {
        email: email
      }
    })
    .then(function(emailExist) {
        if(emailExist) {
            callback({
                status: 409,
                data: [],
                message: 'Email-id is already exist.'
            }); 
        } else {
            callback({
                status: 200,
                data: [],
                message: 'Email-id does not exist.'
            });
        }                    
    })
    .catch(function(err) {
        console.log(err)
        callback({
            status: 500,
            message: err
        });
    });  
};

/**
 * userAuthenication will valid user credentials
 * @param  {obj}   req
 * @param  {obj}   res
 * @return json for fail or success notification
*/
exports.userAuthenication = function(req, res) {
    db.models.user.find({
        where:{
            email: req.body.email,
            password: req.body.password
        }
    }).then(function(user) {
        if(user) {
            res.json({
                status: 200,
                data: user,
                message: 'User has been login successfully.'
            });
        }
        else {
            res.json({
                status: 401,
                data: null,
                message: 'Email and password is invalid.'
            });
        }
    });  
};

/**
 * sendEmailUser will send mail to user
 * @param  {obj}   req
 * @param  {obj}   res
 * @return json for fail or success notification
*/
exports.sendEmailUser = function(req, res) {
    var emailTemplate = generalConfig.emailTemplate;
    var emailbody = emailTemplate.usercredentailsEmailBody;
    emailbody = emailbody.replace("%userfullname%", req.body.username);
    emailbody = emailbody.replace("%result%", req.body.result);
    
    var emailmessage = emailTemplate.emailContainerHeaderString;
    emailmessage += emailbody;
    emailmessage += emailTemplate.emailContainerFooterString;
    // Replace user and pass with your gmail credential to send mail.
    var send = email.createTransport({
        service: 'gmail',
        auth: {
            user: 'xxxxxx',
            pass: 'xxxx'
        }
    });
    
    var message = {
        from:    "xxxxxx",
        to:      "xxxxxx",
        subject: emailTemplate.userResultSubject,
        html:emailmessage
    };

    send.sendMail(message, function (err, info) {
        if(err) console.error(err);
        else {
            res.json({
                status: 200,
                data:[], 
                message: 'Result has been email to you.'
            });
        }
    });
};

