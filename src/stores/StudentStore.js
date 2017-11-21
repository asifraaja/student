import {EventEmitter} from 'events';
var DatabaseUtility = require('../utility/DatabaseUtility');

var host = 'localhost';
var username = 'root';
var password = 'Guddu786';
var database = 'studentDb';

class StudentStore extends EventEmitter{
  constructor(){
    super();
    this.student = [{}];
    this.db = new DatabaseUtility();
  }

  getAllStudents(){
    this.db.connect_db(host,username,password,database);
    this.db.disconnect_db();
    return this.student;
  }

  addStudent(currStudent){
    console.log(currStudent);
    this.student.push(currStudent);
    /* Add the student into a database */
  }
}

const studentStore = new StudentStore;

export default studentStore;
