var http = require('http'),
    fs = require('fs');

var listenPort = process.env.PORT || 3030;

var app = http.createServer(function (req, res) {
	if(req.url == '/') {
        fs.readFile('./socket.html', 'UTF8', function(err, content) {
            if(err) {
                res.writeHead(500);
		        res.end("Error: " + err);
                return;
            }
            
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(content);
        });
	} else {
		res.writeHead(404);
		res.end("File Not Found!");
	}
}).listen(listenPort);

console.log('Listening on port: ' + listenPort)

var io = require('socket.io').listen(app);

/**
	Turn down the log level to prevent socket.io messages from flooding stdout.
**/
io.set('log level', 0);

/**
	Setup the socket.io connection event. This function is called whenever a
	new socket.io conncetion is made to the server. The socket object passed
	to the function is tied to the client who initiated the connection.
**/
io.sockets.on('connection', function (socket) {
	/**
		Send a message to the client that just connected.
	**/
    socket.emit('message', 'Hello from the server!');
    
    /**
    	Setup another socket.io event handler. This event is triggered when
    	a message is received that matches the type of 'message'.
    **/
    socket.on('message', function (data) {
        console.log(data);
    });
});
