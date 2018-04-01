'use strict';
var jwt = require('jwt-simple');
var crypto = require('crypto');
var base64 = require('base-64');
var utf8 = require('utf8');
var localStorage = require('localStorage');
var http = require('http');

module.exports = function(app) {
    var siteUserRoute = require('./api/site/user/route/userRoute.js');
    new siteUserRoute(app);

    http.createServer(app).listen(3061, function() {
		console.log("Express server listening on port %s with worker pid:%s ", 3061, process.pid);
	});

};
