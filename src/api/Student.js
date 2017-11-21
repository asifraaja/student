var express = require('express');
var app = express();
var mysql = require('mysql');
var PORT= process.env.PORT || 3000;

var DatabaseUtility = require('../utility/DatabaseUtility');


mongoose.connect('mongodb://localhost/register');

var db= mongoose.connection;

app.get('/api/student', function (req,res){

    Student.getStudents(function (err, student){
        if(err){
            throw err;
        }
        res.json(student);
    });
});


app.listen(PORT);

console.log('Running app on port:' + PORT);
