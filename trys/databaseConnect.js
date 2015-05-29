var http = require('http');
var portfinder = require('portfinder');
var mysql = require('mysql');

function DataCom(){
    this.connection = mysql.createConnection({
          host     : 'sql4.freemysqlhosting.net',
          user     : 'sql478053',
          password : 'lM3*bZ2%',
          database : 'sql478053'
    });
    this.hasData = false;
    this.data = [];
    this.result = [];
}

DataCom.prototype.connect = function(){
    console.log("try to connect");
    this.connection.connect(function(err){
        if(!err) {
            console.log("Database is connected ... \n\n");  
        } else {
            console.log("Error connecting database ... \n\n");  
        }
    });
}

DataCom.prototype.dataQuery = function(query){
    console.log("start");
    this.connection.query(query, function(err, rows, fields) {
        console.log("querying");
        if (err)
            throw err;

        this.data = rows;
        this.hasData = true;
    });
};

DataCom.prototype.waitAndGetData = function(query){
    while(!this.hasData){
    }

    return this.data;
}

DataCom.prototype.exit = function(query){
    this.connection.exit();
}


portfinder.getPort(function (err, port) {
	console.log( 'Port open:' + port);
	
	http.createServer(function (req, res) {
        var dataCom = new DataCom();
        dataCom.connect();
        dataCom.dataQuery('SELECT * from HouseholdMembers');
        console.log("waiting");

        console.log(dataCom.waitAndGetData());

        dataCom.exit();
  
		// Response
		res.writeHead(200, {'Content-Type': 'text/plain'});
/*
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
*/	
	    res.end('simple test of running a query in mysql');


	
	}).listen( port, '127.0.0.1' );
	console.log('Server running at http://127.0.0.1:' + port + '/' );
 });
