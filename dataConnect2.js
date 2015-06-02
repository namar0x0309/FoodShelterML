// Runs the mlFunciton with the data from the dataQuery and resultQuery.
function queryDB(mysql, dataQuery, resultQuery, mlFunction){

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

function foodShelterPredictor(mysql)
{
    //var ml = require('machine_learning');
    
    var mlFunct = function(mlData, resultData){
        
        // TODO: Normalize characters to match 'F'!='f' (upper case doofus)
        //for( var i = 0; len(mlData))
    	var dt = new ml.DecisionTree({
    	    data : mlData,
    	    result : resultData
    	});
     
    	dt.build();
     
    	//dt.print();
        //dt.prune(1.0); // 1.0 : mingain.
            
        console.log( "Classify : ", dt.classify( ['Tue Jan 17 2012 00:00:00 GMT-0800 (PST)', 80] )  );
    }
    
    //
    //exports.world('select Sex, AgeGroup, WorksInArea from HouseholdMembers limit 5',
    //              'select Age from HouseholdMembers limit 5',
    //               mlFunct); 
    
    /*
    SELECT * FROM sql478053.FoodDonations;
     */
     
     // Data: Month, Pounds
     // Test: DonorID
    queryDB(mysql, 'SELECT TrxDate, Pounds FROM sql478053.FoodDonations order by TrxID limit 25',
                  'SELECT DonorID FROM sql478053.FoodDonations order by TrxID limit 25',
                   mlFunct); 
}

