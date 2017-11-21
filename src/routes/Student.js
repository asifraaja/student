var host = 'localhost';
var port = 3001;

var express = require('express');
var async = require('async');
var mysql = require('mysql');
var router = express.Router;
var assert = require('assert');
var bodyParser = require('body-parser');

var DatabaseUtility = require('../utility/DatabaseUtility');
var db = new DatabaseUtility();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var counter = 0;
var resultArray = [];
var connection;

app.listen(port, host);
console.log('Running server at http://localhost:' + port + '/');

/* GET HOME PAGE */
app.get('/', (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.json({ message: "I'm just testing to see if this works" });
});

// display list of students
app.get('/student',function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  counter += 1;
  console.log('Getting student details '+ counter);
  db.connect_db('localhost','root','Guddu786','react')
  db.select_query('select * from student',function(err,data){
    if(err){
      console.log("Error during fetching : " ,err);
    }else{
      console.log("Result : ",data);
      res.json(data);
    }
  });
  db.disconnect_db();
});

// insert a student into database
app.post('/student/add',function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
  var jsonString = '';
  var student = {};
  req.on('data', function(data){
    jsonString += data;
    console.log(jsonString);
  });
  req.on('end', function(){
    student = JSON.parse(jsonString);
    console.log(student);

    var name = student['name'];
    var age = student['age'];
    var dept = student['dept'];
    db.connect_db('localhost','root','Guddu786','react')
    var query = "insert into student values ('"+name+"',"+age+",'"+dept+"')";
    console.log(query);
    db.execute_query(query,function(err, result){
      if(err){
        console.log('Error during insertion : ' ,err);
        res.json({message : "Failed"});
      }
      else{
        console.log('Data is inserted : ' ,name, age, dept);
        res.json({message : "Success"});
      }
    });
    db.disconnect_db();
  });
});

// search a student in database
app.post('/student/search',function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
  var jsonString = '';
  var jsonObject = {};

  req.on('data', function (data) {
    jsonString += data;
  });

  req.on('end', function () {
    jsonObject = JSON.parse(jsonString);

    var name = jsonObject['name'];
    var query = 'select * from student where name like \''+name+'%\'';
    db.connect_db('localhost','root','Guddu786','react')
    console.log(query);
    db.select_query(query,function(err, result){
      if(err) console.log('Error during fetching : ',err);
      else{
        console.log('Data Read : ',result);
        res.json(result);
      }
    });
    db.disconnect_db();
  });


});

module.exports = router;
