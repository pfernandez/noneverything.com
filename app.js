

// Module dependencies.
var express = require('express'),
	http    = require('http'),
    path    = require('path'),
    mime    = require('mime');


var app = express();


// Set the port to listen at.
app.set('port', process.env.PORT || 3000);


// Include standard modules.
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(app.router);


app.use(function(err, req, res, next){
	console.error(err.stack);
	var is_ajax_request = req.xhr;
    var is_html = (mime.lookup(req.path).indexOf('html') !== -1);

    res.writeHead(301, {'Location':'/', 'Expires': (new Date).toGMTString()});
    res.end();
});


// Settings for development mode.
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
	var hourMs = 0; // static files cache duration
}
else {
	var hourMs = 1000*60*60;
}


// Use static files in the public/ directory.
app.use(express.static(__dirname + '/public', { maxAge: hourMs }));


// Show directory listings.
app.use(express.directory(__dirname + '/public'));


// Show index.html unless we have an ajax request or the requested
// resource is something other than html.
app.get('*', function(req, res) {

    var is_ajax_request = req.xhr;
    var is_html = (mime.lookup(req.path).indexOf('html') !== -1);

    if(!is_html || is_ajax_request) {
        res.sendfile(__dirname + '/public' + req.path);
    }
    else
        res.sendfile(__dirname + '/public/index.html');
});


// Start the server.
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
