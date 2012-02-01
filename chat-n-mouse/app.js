var app = require('express').createServer();
var io = require('socket.io').listen(app);
io.set('log level', 0);

app.listen(process.env.C9_PORT);

app.get('/', function (req, res) {
    console.log('served static file ' + __dirname + '/index.html');
    res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
    socket.on('mouse-location', function (data) {
        data.id = socket.id;
        socket.broadcast.emit('mouse-location', data);
    });

    socket.on('message', function (data) {
        console.log(data);
        socket.broadcast.emit('message', data);
    });
});
