var http = require('http');
var portfinder = require('portfinder');

portfinder.getPort(function (err, port) {
	console.log( 'Port open:' + port);
	
	http.createServer(function (req, res) {
  
		// Response
		res.writeHead(200, {'Content-Type': 'text/plain'});

        var mysql      = require('mysql');
        var connection = mysql.createConnection({
              host     : 'sql4.freemysqlhosting.net',
              user     : 'sql478053',
              password : 'lM3*bZ2%',
              database : 'sql478053'
        });

        connection.connect();

        connection.query('SELECT * from HouseholdMembers', function(err, rows, fields) {
              if (!err)
                console.log('The solution is: ', rows);
          else
                console.log('Error while performing Query.');
        });

        connection.end();
	
	    res.end('simple test of running a query in mysql');


	
	}).listen( port, '127.0.0.1' );
	console.log('Server running at http://127.0.0.1:' + port + '/' );
 });
