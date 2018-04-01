import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';


require('../server/config/commonModule');
//var express = require('express');
//var favicon = require('serve-favicon');
import compression from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import errorHandler from 'errorhandler';


import session from 'express-session';
import expressValidator from 'express-validator';

/*eslint-disable no-console */

const port = 3100;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));


app.use(compression());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



app.set('appPath', 'public');
app.use(express.static(__dirname + '/../'));
app.use(express.static(__dirname + '/../public'));

const router = require('../server/routes');
router(app);

app.all('/*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

global.setInterval_references = {};
