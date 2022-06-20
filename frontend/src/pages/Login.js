import React, { Component } from 'react'
import { Form,Button,Row,Col } from 'react-bootstrap';
import '../css/admin.css'
import axios from 'axios';
export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
          logged:false,
        }
    }
  try_login = (event)=>{
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    axios.post('http://127.0.0.1:8000/api/token/',{'username':username,'password':password})
    .then(response=>{
        let token = response.data.access
        this.props.SetToken(token)
        console.log(response)
    })
  }
  
  render() {
    if (this.state.logged){
      return
    }else{
      return (
        <div className='text-center' id="all_cont">
          <h2>Login</h2>
          <form onSubmit={this.try_login}>
            <input type='text' placeholder='Username' className='input' name='username'></input>
            <br></br>
            <br></br>
            <br></br>
            <input type='password' placeholder='Password' className='input' name='password'></input>
            <br></br>
            <br></br>
            <button type='submit'>Login</button>
          </form>
          
        </div>
      )
    }
  }
}
