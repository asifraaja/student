import React, {Component} from 'react';
import {HashRouter,Link,Route} from 'react-router-dom';

import Header from './Header';
import AddStudent from './AddStudent';
import DisplayStudents from './DisplayStudents';
import Search from './Search';
import DeleteStudent from './DeleteStudent';
import '../bootstrap.css';

export default class Student extends Component{
  constructor(){
    super();
  }

  render(){
    return(
      <div className="container">
        <HashRouter>
          <div className="navbar navbar-brand:hover">
            <ul>
              <li><Link to="/student/add">Add</Link></li>
              <li><Link to="/student/search">Search</Link></li>
              <li><Link to="/student/delete">Delete</Link></li>
            </ul>
            <hr />
            <div className="display-component">
              <DisplayStudents />
            </div>
            <div className="student-component">
              <Route path="/student/add" component={AddStudent} />
              <Route path="/student/search" component={Search}/>
              <Route path="/student/delete" component={DeleteStudent}/>
            </div>
          </div>
        </HashRouter>
      </div>
    );
  }
}
