'use strict';

// add newrelic key
// require('newrelic');

// env configuration
var port = process.env.PORT || 3000;

// modules
var express   = require('express'),
    exphbs    = require('express3-handlebars'),
    http      = require('http'),
    path      = require('path'),
    logger    = require('./logger'),
    app       = express();

// port  / handlebars engine
app.set('port', port);
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

// middleware
app.use(express.compress());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.json());
app.use(express.urlencoded());
app.use(require('winston-request-logger').create(logger));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// make her listen
http.createServer(app).listen(app.get('port'));

module.exports.app = app;
require('./routes');
