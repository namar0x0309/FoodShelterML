function DataCom(){
    this.mysql = require('mysql');
    this.connection = this.mysql.createConnection({
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

var dataCom = new DataCom();
dataCom.connect();
dataCom.dataQuery('SELECT * from HouseholdMembers');
console.log("waiting");

console.log(dataCom.waitAndGetData());

dataCom.exit();
