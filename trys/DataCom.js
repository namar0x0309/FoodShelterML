var mysql = require('mysql');

function DataCom(){
    this.connection = mysql.createConnection({
          host     : 'sql4.freemysqlhosting.net',
          user     : 'sql478053',
          password : 'lM3*bZ2%',
          database : 'sql478053'
    });
}

DataCom.prototype.connect = function(){
    this.connection.connect();
}

DataCom.prototype.dataQuery(query){
    return connection.query(query, function(err, rows, fields) {
    if (err)
        return err;

    return rows;
    });
};

});
