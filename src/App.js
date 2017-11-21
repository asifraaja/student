import React, { Component } from 'react';
import {HashRouter,Link,Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Header from './components/Header';
import Student from './components/Student';

var currTitle;

class App extends Component {
  render() {
    return (
      <div className="App">
      <Header title={currTitle}/>
        <HashRouter>
          <div className="navbar">
            <ul>
              <li><Link to="/student">Student</Link></li>
            </ul>
            <hr />
            <Route path="/student" component={Student}/>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
