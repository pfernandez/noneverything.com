/**
 * Module dependencies.
 */

// Load module dependencies.
var express = require('express')
var http    = require('http')
var path    = require('path');

// Innstantiate the app.
var app = express();

// Set up the environment.
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));  // use static files in 'public/'
app.use(express.directory(__dirname + '/public'));  // show directory listings 

// Handle errors depending on mode: 'development' or 'production'.
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port')
        + ' in ' + app.get('env') + ' mode.');
});
