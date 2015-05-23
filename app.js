var http = require('http');
var portfinder = require('portfinder');
var ml = require('machine_learning');
var jade = require('jade');

// Code to include external javascript files.
var fs = require('fs');
var vm = require('vm');

var includeInThisContext = function(path) {
    var code = fs.readFileSync(path);
    vm.runInThisContext(code, path);
}.bind(this);

// Include javascript files.
includeInThisContext(__dirname + "/machinelearning.js");

 // frontend  
////var indexTemplatePath = 'views/index.jade';
//var donorTemplatePath = 'views/donor.jade';
//var shelterTemplatePath = 'views/shelter.jade';
//var householdTemplatePath = 'views/household.jade';

////var index = fs.readFileSync(indexTemplatePath, 'utf8');
////var fn = jade.compile(index);
////var tmp = fn();
//var donorHTML = jade.compileFile(donorTemplatePath)(userObject);
//var shelterHTML = jade.compileFile(shelterTemplatePath)(userObject);
//var householdHTMl = jade.compileFile(householdTemplatePath)(userObject);

portfinder.getPort(function (err, port) {
	console.log( 'Port open:' + port);
	
	http.createServer(function (req, res) {
  
        // Response
        res.writeHead(200, {'Content-Type': 'text/html'});
        
        /*
        res.end('Food Shelter Predictor\n' +
                'Getting Database....\n' +
                'Learning...\n');
        */
        res.write(tmp); // index template
        res.end();
                            
        logisticRegressionTest();
                            
        console.log( '  \n \n \n ');
                            
        kMeansClusteringTest();
                            
        console.log( '\n\n\n');
                            
        decisionTreeTest();
	
	
	}).listen( port, '127.0.0.1' );
    
	console.log('Server running at http://127.0.0.1:' + port + '/' );
 });
 

