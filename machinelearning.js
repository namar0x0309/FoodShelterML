 /***************************** code ***********************************/
 function logisticRegressionTest()
 {
	 var x = [[1,1,1,0,0,0],
	          [1,0,1,0,0,0],
	          [1,1,1,0,0,0],
	          [0,0,1,1,1,0],
	          [0,0,1,1,0,0],
	          [0,0,1,1,1,0]];
	 var y = [[1, 0],
	          [1, 0],
	          [1, 0],
	          [0, 1],
	          [0, 1],
	          [0, 1]];
 
	 var classifier = new ml.LogisticRegression({
	     'input' : x,
	     'label' : y,
	     'n_in' : 6,
	     'n_out' : 2
	 });
 
	 classifier.set('log level',1);
 
	 var training_epochs = 800, lr = 0.01;
 
	 classifier.train({
	     'lr' : lr,
	     'epochs' : training_epochs
	 });
 
	 x = [[1, 1, 0, 0, 0, 0],
	      [0, 0, 0, 1, 1, 0],
	      [1, 1, 1, 1, 1, 0]];
 
	 console.log("Result : ",classifier.predict(x));
 }


function kMeansClusteringTest()
{ 
	var data = [[1,0,1,0,1,1,1,0,0,0,0,0,1,0],
	            [1,1,1,1,1,1,1,0,0,0,0,0,1,0],
	            [1,1,1,0,1,1,1,0,1,0,0,0,1,0],
	            [1,0,1,1,1,1,1,1,0,0,0,0,1,0],
	            [1,1,1,1,1,1,1,0,0,0,0,0,1,1],
	            [0,0,1,0,0,1,0,0,1,0,1,1,1,0],
	            [0,0,0,0,0,0,1,1,1,0,1,1,1,0],
	            [0,0,0,0,0,1,1,1,0,1,0,1,1,0],
	            [0,0,1,0,1,0,1,1,1,1,0,1,1,1],
	            [0,0,0,0,0,0,1,1,1,1,1,1,1,1],
	            [1,0,1,0,0,1,1,1,1,1,0,0,1,0]
	           ];
 
	var result = ml.kmeans.cluster({
	    data : data,
	    k : 4,
	    epochs: 100,
 
	    distance : {type : "pearson"}
	    // default : {type : 'euclidean'}
	    // {type : 'pearson'}
	    // Or you can use your own distance function
	    // distance : function(vecx, vecy) {return Math.abs(dot(vecx,vecy));}
	});
 
	console.log("clusters : ", result.clusters);
	console.log("means : ", result.means);
}
 
function decisionTreeTest()
{
	// Reference : 'Programming Collective Intellignece' by Toby Segaran.
  
	var data =[['slashdot','USA','yes',18],
	           ['google','France','yes',23],
	           ['digg','USA','yes',24],
	           ['kiwitobes','France','yes',23],
	           ['google','UK','no',21],
	           ['(direct)','New Zealand','no',12],
	           ['(direct)','UK','no',21],
	           ['google','USA','no',24],
	           ['slashdot','France','yes',19],
	           ['digg','USA','no',18,],
	           ['google','UK','no',18,],
	           ['kiwitobes','UK','no',19],
	           ['digg','New Zealand','yes',12],
	           ['slashdot','UK','no',21],
	           ['google','UK','yes',18],
	           ['kiwitobes','France','yes',19]];
	var result = ['None','Premium','Basic','Basic','Premium','None','Basic','Premium','None','None','None','None','Basic','None','Basic','Basic'];
 
	var dt = new ml.DecisionTree({
	    data : data,
	    result : result
	});
 
	dt.build();
 
	// dt.print();
 
	console.log("Classify : ", dt.classify(['(direct)','USA','yes',5]));
 
	dt.prune(1.0); // 1.0 : mingain.
	dt.print();
	
}