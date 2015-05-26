/* global __dirname */
var http = require('http');
var portfinder = require('portfinder');
var ml = require('machine_learning');

// Code to include external javascript files.
var fs = require('fs');
var vm = require('vm');
var includeInThisContext = function(path) {
    var code = fs.readFileSync(path);
    vm.runInThisContext(code, path);
}.bind(this);

// Include javascript files.
includeInThisContext(__dirname+"/machinelearning.js");


portfinder.getPort(function (err, port) {
	console.log( 'Port open:' + port);
	
	http.createServer(function (req, res) {
  
		// Response
	res.writeHead(200, {'Content-Type': 'text/plain'});
	
	var output = decisionTreeTest();
			
	res.end( output );

	
	
	}).listen( port, '127.0.0.1' );
	console.log('Server running at http://127.0.0.1:' + port + '/' );
 });
 
 