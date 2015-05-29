var mysql      = require('mysql');
var connection = mysql.createConnection({
      host     : 'sql4.freemysqlhosting.net',
      user     : 'sql478053',
      password : 'lM3*bZ2%',
      database : 'sql478053'
});

connection.connect();

// Get the data to use in the tree
connection.query('select Sex, AgeGroup, WorksInArea from HouseholdMembers limit 5', function(err, rows, fields) {
    if (!err){
        mlData = [];
        
       // turn the data into an array 
        Object.keys(rows).forEach(function(key) {
            rowData = [];
            var row = rows[key];
            Object.keys(row).forEach(function(key) {
                rowData.push(row[key]);
            });
            mlData.push(rowData);
        });
        console.log(mlData);    

        connection.query('select Inactive from HouseholdMembers limit 5', mlData, function(err, rows, fields) {
            if (!err){
                var result = [];
                Object.keys(rows).forEach(function(key) {
                    var row = rows[key];
                    var val = row[Object.keys(row)[0]]; 
                    result.push(val);
                });
                console.log(result);
            } 
            else{
                console.log(err)
            }
        });
    }
    else
        console.log('Error while performing Query.');
});

//connection.end();
