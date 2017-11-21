import React , {Component} from 'react';

class DeleteStudent extends Component{
  constructor(props){
    super(props);
    this.state = {
      name : '',
      students : []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event){
    var target = event.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name] : value
    });
  }

  handleSubmit(event){
    event.preventDefault();
    var self = this;
    const options = {
      method : 'POST',
      body : JSON.stringify({
        name : self.refs.name.value
      }),
    };
    fetch('http://localhost:3001/student/search',options)
    .then(response => response.json())
    .then(result => {
      this.setState({
        students : result
      });
    });
  }

  handleDelete(index){
    var self = this;
    const options = {
      method : 'POST',
      body : JSON.stringify({
        name : self.refs.name.value,
        age : self.refs.age.value,
        dept : self.refs.dept.value
      })
    };
    fetch('http://localhost:3001/student/delete',options)
    .then(response => response.json())
    .then(result => {
      console.log(result)
    })
  }

  render(){
    return(
      <div className="container">
        <h3 className="h3"> Delete a Student </h3>
        <form>
          <label htmlFor="name" value="Name :"/>
          <input type="text" id="name" name="name" ref="name"
                  value={this.state.name} onChange={this.handleInputChange} />
          <input type="submit" value="Delete" />
        </form>
        {this.state.students.map((student,index) =>
          <li>
            <span>{student.name}</span>
            <span>{student.age}</span>
            <span>{student.dept}</span>
            <span><button onClick={this.handleDelete.bind(this,index)}>Delete</button></span>
          </li>
        )}
      </div>
    );
  }
}

export default DeleteStudent;
