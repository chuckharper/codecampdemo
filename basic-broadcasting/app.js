/**
    Node.js uses the CommonJS for the ability to import external javascript 
    files. Here we are requiring the http module and assigning it to the http 
    variable and assigning the fs module to the fs variable.
**/
var http = require('http'),
    fs = require('fs');

/**
	process.env.PORT is an environemnt variable set in the Cloud 9 IDE and 
    is used tocreate the proxy from your assigned URL to the back end port number. 
    We are using the coalescing operation to either use the Cloud 9 value, or 
    fail over to 3030 if that value is not set.
**/
var listenPort = process.env.PORT || 3030;

/**
	Create the instance of the http server which will handle the requests.
	The createServer method takes a function which is called every time a 
	request to the server is made.
**/	
http.createServer(function (req, res) {
	if(req.url == '/') {
        /**
            If the request is to '/' then read the contents of index.html and 
            return the results to the caller. If an error occurs for some reason
            return a 500 error with the error message.
        **/
        fs.readFile(__dirname + '/index.html', 'UTF8', function(err, content) {
            if(err) {
                console.log(err);
    	        res.writeHead(500);
		        res.end("Error: " + err);
                return;
            }
            
            console.log(content);
            res.end(content);
        });
	} else {
        /**
            This request is to something other than '/' so we will return a 404 
            error.
        **/
		res.writeHead(404);
		res.end("File Not Found!");
	}
}).listen(listenPort);

console.log('Listening on port: ' + listenPort)
var app = require('express').createServer();
var io = require('socket.io').listen(app);
io.set('log level', 0);

app.listen(process.env.C9_PORT);

app.get('/', function (req, res) {
    console.log('served static file ' + __dirname + '/index.html');
    res.sendfile(__dirname + '/index.html');
});

var counter = 0;
setInterval(function() {
    counter++;
    io.sockets.emit('hello', 'Hello Count ' + counter);
}, 1000);

io.sockets.on('connection', function (socket) {
    console.log('Client connected!');
});
