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
includeInThisContext(__dirname + "/machinelearning.js");
includeInThisContext(__dirname + "/dataConnect2.js");

portfinder.getPort(function (err, port) {
	console.log( 'Port open:' + port);
	   
    // // // learning       
    console.log( '  \n \n \n ');
                           
    getDataAndBuildDecisionTree( 'SELECT TrxDate FROM sql478053.FoodDonations order by TrxID limit 20',
                                        'SELECT DonorID FROM sql478053.FoodDonations order by TrxID limit 20', 
                                         foodShelterPredictor );               

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
            console.log( data)
            
            /*
                Get Data and cross refrence  
                SELECT ID, Name FROM sql478053.Donors;
                
                {"9":1,"11":6,"12":7,"15":3}

                cross with these. 
            */
            
             // Page generation
            res.render('shelter', {
                title: 'Shelter',
                months: JSON.stringify(data)
            });
        }
        getDataAndBuildDecisionTree( mysql, 'SELECT TrxDate FROM sql478053.FoodDonations order by TrxID limit 25',
                                        'SELECT DonorID FROM sql478053.FoodDonations order by TrxID limit 25',
                                         foodShelterPredictor, pageRenderShelter );
    });
    
    app.listen(8000);
 });
 
 