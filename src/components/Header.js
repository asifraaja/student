import React,{Component} from 'react';
import logo from '../logo.svg';

var title;
export default class Header extends Component{
  constructor(props){
    super(props);
    title = this.props.title;
  }
  render(){
    return(
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to {title}</h1>
      </header>
    );
  }
}
