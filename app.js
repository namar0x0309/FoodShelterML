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
	
	  res.end('Food Shelter Predictor\n' +
						'Getting Database....\n' +
						'Learning...\n');
						
						logisticRegressionTest();
						
						console.log( '  \n \n \n ');
						
						kMeansClusteringTest();
						
						console.log( '\n\n\n');
						
						decisionTreeTest();
	
	
	}).listen( port, '127.0.0.1' );
	console.log('Server running at http://127.0.0.1:' + port + '/' );
 });
 
 