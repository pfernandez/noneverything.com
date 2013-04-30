/**
 * Module dependencies.


// Load module dependencies.
var express = require('express');
var http    = require('http');
var path    = require('path');

// Innstantiate the app.
var app = express();

// Set up the environment.
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));  // use static files in 'public/'
//app.use(express.directory(__dirname + '/public'));  // show directory listings 

// Handle errors depending on mode: 'development' or 'production'.
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}


function serveIndex(req, res) {
    res.sendfile(path.join(__dirname, 'public/index.html'));
}
app.get('*', serveIndex);
app.post('*', serveIndex);


http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port')
        + ' in ' + app.get('env') + ' mode.');
}); */


/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , mime = require('mime');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(app.router);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.directory(__dirname + '/public'));  // show directory listings 


// Show index.html unless we have an ajax request.
app.get('*', function(req, res) {

    var is_ajax_request = req.xhr;
    var is_html = (mime.lookup(req.path).indexOf('html') !== -1);

    if(! is_html || is_ajax_request) {
        res.sendfile(__dirname + '/public' + req.path);
    }
    else
        res.sendfile(__dirname + '/public/index.html');
});


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
