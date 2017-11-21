var DatabaseUtility = require('./DatabaseUtility');
var db = new DatabaseUtility();

console.log('In Main.js');
db.connect_db('localhost','root','Guddu786','studentDb');
db.disconnect_db();
