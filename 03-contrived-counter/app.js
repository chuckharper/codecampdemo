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

io.sockets.on('connection', function (socket) {
    /**
        For each user that connects, we setup a counter which we increment and send to 
        the connected client every second.
    **/
    var counter = 0;
    setInterval(function() {
        counter++;
        socket.emit('message', 'Hello Count ' + counter);
    }, 1000);
});
