import React, {Component} from 'react';

export default class AddStudent extends Component{
  constructor(){
    super();
    this.state = {
      name : '',
      age : '',
      dept : '',
      department : ['select','cse','mech','eee'],
      students : [{}],
      success : ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event){
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name] : value
    })

  }

  handleSubmit(event){
    event.preventDefault();
    var self = this;
    const options = {
      method : 'POST',
      body : JSON.stringify({
        name : self.refs.name.value,
        age : self.refs.age.value,
        dept : self.refs.dept.value
      }),
    };
    fetch('http://localhost:3001/student/add',options)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      const result_value = 'Student Insertion ' + result['message'];
      this.setState({
        success : result_value
      });
      console.log(this.state.success);
    });
    this.setState({
      name : '',
      age : '',
      dept : '',
    });
  }
  render(){
    return(
      <div className="container">
        <h2> Add a Student </h2>
        <span>{this.state.success}</span>
        <form id="student-add-form" className="form" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input required type="text" id="name" name="name" ref="name"
                  value={this.state.name} onChange={this.handleInputChange} /> <br />
          <label htmlFor="age">Age</label>
          <input required type="text" id="age" name="age" ref="age"
                  value={this.state.age} onChange={this.handleInputChange} /> <br />
          <label htmlFor="dept">Dept</label>
          <select id="dept" name="dept" ref="dept" onChange={this.handleInputChange} value={this.state.dept}>
            {this.state.department.map((currDept,index) =>
              <option>{currDept}</option>
            )}
          </select><br />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
