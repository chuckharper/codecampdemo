
var http = require('http'),
	fs = require('fs');

var listenPort = process.env.C9_PORT || 3030;

http.createServer(function (req, res) {
	if(req.url == '/') {
		/**
			Send the contents of index.html instead of hard coding the response.
		**/
		res.end(fs.readFileSync('index.html'));
	} else {
		res.writeHead(404);
		res.end("File Not Found!");
	}

}).listen(listenPort);

console.log('Listening on port ' + listenPort);
