
var app = require('express').createServer();
var io = require('socket.io').listen(app);
io.set('log level', 0);

app.listen(process.env.C9_PORT);

app.get('/', function (req, res) {
    console.log('served static file ' + __dirname + '/index.html');
    res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
    console.log(socket);
    socket.emit('hello', 'Hello World!');
    
    socket.on('hello', function (data) {
        console.log(data);
    });
});
