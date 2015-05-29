// Runs the mlFunciton with the data from the dataQuery and resultQuery.
exports.world = function(dataQuery, resultQuery, mlFunction){
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
          host     : 'sql4.freemysqlhosting.net',
          user     : 'sql478053',
          password : 'lM3*bZ2%',
          database : 'sql478053'
    });

    connection.connect();

    // Get the data to use in the tree
    connection.query(dataQuery, [resultQuery, mlFunction], function(err, rows, fields) {
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

            //Get the data about the results
            connection.query(resultQuery, [mlData, mlFunction], function(err, rows, fields) {
                if (!err){
                    var result = [];
                    Object.keys(rows).forEach(function(key) {
                        var row = rows[key];
                        var val = row[Object.keys(row)[0]]; 
                        result.push(val);
                    });
                    console.log(mlData); 
                    console.log(result);

                    // run the machine learning function
                    mlFunction(mlData, result);
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

}

var ml = require('machine_learning');

var mlFunct = function(mlData, resultData){
	var dt = new ml.DecisionTree({
	    data : mlData,
	    result : resultData
	});
 
	dt.build();
 
	dt.print();
}


exports.world('select Sex, AgeGroup, WorksInArea from HouseholdMembers limit 5', 'select Age from HouseholdMembers limit 5', mlFunct); 
