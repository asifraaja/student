import React, {Component} from 'react';

export default class Search extends Component{
  constructor(props){
    super(props);
    this.state = {
      name : '',
      students : [{}]
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    var self = this;
    const options = {
      method : 'POST',
      body : JSON.stringify({
        name : self.refs.name.value
      }),
    }
    fetch('http://localhost:3001/student/search', options)
    .then(response => response.json())
    .then(result => this.setState({
      students : result
    }));

  }

  handleInputChange(event){
    var target = event.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name] : value,
    });
  }

  render(){
    return(
      <div className="container">
        <h3 className="h3">Search a Student</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name" value="Name" />
          <input type="text" name="name" id="name" ref="name" onChange={this.handleInputChange} value={this.state.name}/>
          <input type="submit" name="submit"/>
        </form>
        <div>
          <ul>
            {this.state.students.map((student,index) =>
              <li>
                <span> {student.name} </span>
                <span> {student.age} </span>
                <span> {student.department} </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}
