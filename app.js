var http = require('http');
var portfinder = require('portfinder');
var ml = require('machine_learning');
mysql      = require('mysql');
deepcopy = require('deepcopy');

// Code to include external javascript files.
var fs = require('fs');
var vm = require('vm');

var includeInThisContext = function(path) {
    var code = fs.readFileSync(path);
    vm.runInThisContext(code, path);
}.bind(this);

// frontend
var jade = require('jade');
var express = require('express');

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


var decisionTree = null;
var decisionData = null;



/**************************** Code start After This Line********************************* */
// Include javascript files.
//includeInThisContext(__dirname + "/machinelearning.js");
//includeInThisContext(__dirname + "/dataConnect2.js");
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

Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr; 
}

function foodShelterPredictor()
{
    // Convert to single value, instead of array
    var formatData = [];
    for(var i =0; i < decisionData.length; i++) {
        formatData.push(decisionData[i][0]);
    }

    var months = formatData.unique(); 

    var predictions = [];
    for(var i =0; i < months.length; i++) {
        var month = months[i];
        var predict = [month, decisionTree.classify([month])];
        predictions.push(predict);
    }

	return predictions; 
}



function getDataAndBuildDecisionTree(queryResultData,
                                     queryTestData, callback, callbackRender )
{
    //var ml = require('machine_learning');

    var mlFunct = function(mlData, resultData){
        
        // Formatting of data  
        for(i = 0; i < mlData.length; ++i )
        {
           var month = mlData[i].toString();
           month = month.slice(4,7);

           mlData[i] = [month]; 
        }
        
        decisionData = deepcopy(mlData);
        
    	var dt = new ml.DecisionTree({
    	    data : mlData,
    	    result : resultData
    	});
     
    	dt.build();
     
    	//dt.print();
        //dt.prune(1.0); // 1.0 : mingain.
            
        decisionTree = dt;
        
        var data = null;
        if( callback != null )
            data = callback();
                
        if( callbackRender != null )
            callbackRender( data );
    }
     
     // Data: Month, Pounds
     // Test: DonorID
    queryDB(mysql, queryResultData, queryTestData,
                   mlFunct); 
}


portfinder.getPort(function (err, port) {
	console.log( 'Port open:' + port);
	   
    // // // learning       
    console.log( '  \n \n \n ');
    /*                       
    getDataAndBuildDecisionTree( 'SELECT TrxDate FROM sql478053.FoodDonations order by TrxID limit 20',
                                 'SELECT Name FROM FoodDonations left outer join Donors on FoodDonations.DonorID = Donors.ID order by TrxID limit 20',
                                         foodShelterPredictor );               
*/
    // Views

    
    // // //
	        
    app.get('/', function(req, res) {
        res.render('index', {
        title: 'Home'
        });
    });

    app.get('/donor', function(req, res) {
        res.render('donor', {
            title: 'Donor'
       });
    });

    app.get('/household', function(req, res) {
        res.render('household', {
            title: 'Household'
       });
    });

    app.get('/shelter', function(req, res) {

        pageRenderShelter = function( data )
        {
            //console.log(data + '\n');
            
            var finalData = [];
            for( var i = 0; i < data.length; ++i )
            {   
                var month = new Object();

                month.name = data[i][0];
               
                // Adding donors
                month.donors = {};
                for( var key in data[i][1] )
                {

                    month.donors[ key ] = data[i][1][key];
                }
                finalData.push( month );

            }
            
            //  console.log("\n\n\n" );
           //console.log( finalData );
            
             // Page generation
            res.render('shelter', {
                title: 'Shelter Future Projections',
                months: finalData
            });
        }
        
        
        getDataAndBuildDecisionTree( 'SELECT TrxDate FROM sql478053.FoodDonations order by TrxID limit 1000',
                                     'SELECT Name FROM FoodDonations left outer join Donors on FoodDonations.DonorID = Donors.ID order by TrxID limit 1000',
                                         foodShelterPredictor, pageRenderShelter );
    });
    
    app.listen(8000);
 });
 
 
