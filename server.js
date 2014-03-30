'use strict';

// modules
var express   = require('express'),
    exphbs    = require('express3-handlebars'),
    http      = require('http'),
    path      = require('path'),
    winston   = require('winston');

var app = express();

// routes
require('./routes')(app);

// port handlebars engine
app.set('port', process.env.PORT || 3000);
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

// middleware
app.use(express.logger({ immediate: true, format: 'dev' }));
app.use(express.compress());
app.use(express.bodyParser());        // pull information from html in POST
app.use(express.methodOverride());    // simulate DELETE and PUT
app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

http.createServer(app).listen(app.get('port'), function(){
  winston.info('Express server listening on port ' + app.get('port'));
});
