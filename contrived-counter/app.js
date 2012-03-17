/**
    Include the socket.io module.
 **/
var http = require('http'),
    fs = require('fs'),
    io = require('socket.io');

io.set('log level', 0);

var listenPort = process.env.PORT || 3030;

http.createServer(function (req, res) {
	if(req.url == '/') {
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
        res.writeHead(404);
		res.end("File Not Found!");
	}
}).listen(listenPort);

console.log('Listening on port: ' + listenPort)

/**
	Bind the socket.io module to the http server to proxy requests.
**/
io.listen(http);

io.sockets.on('connection', function (socket) {
    console.log('Client connected!');
    var counter = 0;
    setInterval(function() {
        counter++;
        socket.emit('hello', 'Hello Count ' + counter);
    }, 1000);
});
