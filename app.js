var http = require('http');
var portfinder = require('portfinder');

portfinder.getPort(function (err, port) {
	http.createServer(function (req, res) {
  
		// Response
		res.writeHead(200, {'Content-Type': 'text/plain'});
	
	  res.end('Food Shelter Predictor\n' +
						'Getting Database....\n' +
						'Learning...\n');
	
	
	}).listen( port, '127.0.0.1' );
	console.log('Server running at http://127.0.0.1:' + port + '/' );
 });

