
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

io.set('log level', 0);

/**
    In this example we remove the connection event, and setup the counter
    independent of any connected clients. We still increment every second,
    but now we send the message to all connected clients.
**/
var counter = 0;
setInterval(function() {
    counter++;
    io.sockets.emit('message', 'Hello Count ' + counter);
}, 1000);
