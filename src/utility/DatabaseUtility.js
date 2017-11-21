var connection;
var mysql= require('mysql');
var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'Guddu786',
  database : 'react'
});

function DatabaseUtility(){

}

DatabaseUtility.prototype.connect_db = function(host,username,passwd,database_name){
  connection = mysql.createConnection({
    host     : host,
    user     : username,
    password : passwd,
    database : database_name
  });
  connection.connect(function(err, conn) {
    if (err) throw err;
    console.log('You are now connected...');
  })
}

DatabaseUtility.prototype.select_query = function(query,callback){
  connection.query(query, function(err, result){
    if(err)
      callback(err, null);
    else {
      callback(null, result);
    }
  });
}

DatabaseUtility.prototype.disconnect_db = function(){
  connection.end(function (err){
    if(err) throw err
    console.log('You are disconnected...');
  })
}

DatabaseUtility.prototype.execute_query = function(query, callback){
  connection.query(query, function(err, result){
    if(err)
      callback(err, null);
    else {
      callback(null, 'Data Updataed');
    }
  });
}



DatabaseUtility.prototype.getConnectionDetails = function(callback){
  if(connection.state == 'disconnected') callback('disconnected');
  callback('connected');
}

module.exports = DatabaseUtility;
