import React, {Component} from 'react';
import axios from 'axios';
import '../bootstrap.css';


export default class DisplayStudents extends Component{
  constructor(){
    super();
    this.state = {
      students : [],
    };
    this.setStudents = this.setStudents.bind(this);
  }

  setStudents(data, length){
    for(var i=0; i<length; i++){
      var student = {};
      student.name = data[i].name;
      student.age = data[i].age;
      student.dept = data[i].dept;
    }
    this.students.push(student);
  }

  componentDidMount(){
    /*
    fetch('http://localhost:3001/student')
    .then(res => res.json())
    .then(result => this.setState({
      students : result,
    }));
    console.log('Students'+this.state.students);
    */
    axios.get('http://localhost:3001/student')
    .then(res => this.setState({ students: res.data }))
    .catch(err => console.log(err))
  }

  render(){
    return(
      <div className="container">
        <h3 className="h3" > List of Students </h3>
        <div className="students">
          <table className="table d-sm-table-row d-sm-table-cell">
            <thead>
              <tr>
                <th> Name </th>
                <th> Age </th>
                <th> Department </th>
              </tr>
            </thead>
            <tbody>
            {this.state.students.map((student,index) =>
              <tr>
                <td> <span> {student.name} </span> </td>
                <td> <span> {student.age} </span> </td>
                <td> <span> {student.department} </span> </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
