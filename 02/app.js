/**
	We're using the express server instead of the built in node.js http server.
**/
var app = require('express').createServer();

var listenPort = process.env.C9_PORT || 3030;

/**
	
**/
app.get('/', function(req, res){
  res.send('Hello World\n');
});

app.listen(listenPort);

console.log('Listening on port ' + listenPort);
