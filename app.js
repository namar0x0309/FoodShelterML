var http = require('http');
var portfinder = require('portfinder');
var ml = require('machine_learning');
var mysql      = require('mysql');


// Code to include external javascript files.
var fs = require('fs');
var vm = require('vm');

var includeInThisContext = function(path) {
    var code = fs.readFileSync(path);
    vm.runInThisContext(code, path);
}.bind(this);

// Include javascript files.
includeInThisContext(__dirname + "/machinelearning.js");
includeInThisContext(__dirname + "/dataConnect2.js");

// frontend
var jade = require('jade');
var express = require('express');

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

portfinder.getPort(function (err, port) {
	console.log( 'Port open:' + port);
	   
    // // // learning       
    console.log( '  \n \n \n ');
                           
    foodShelterPredictor(mysql);               

    console.log( '\n\n\n');
                            

    
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
        res.render('shelter', {
            title: 'Shelter'
        });
    });
    
    app.listen(8000);
 });
 
 