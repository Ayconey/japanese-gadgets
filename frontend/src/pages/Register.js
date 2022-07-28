import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import '../css/admin.css'
import axios from 'axios';

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
          success:false,
          failed:false,
        }
    }
  register = (event)=>{
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password1 = event.target.password1.value;
    const password2 = event.target.password2.value;
    axios.post('http://127.0.0.1:8000/dj-rest-auth/registration/',{'email':email,'username':username,'password1':password1,'password2':password2})
    .then(response=>{
        this.setState({success:true})
    })
  }
  
  render() {
    if (this.state.success){
      return <Navigate
        to={{
          pathname: "/login",
          search: "?from-register=true",
          state: { }
        }}
      />
    }else{
      return (
        <div className='text-center' id="all_cont">
          <h2>Register</h2>
          <form onSubmit={this.register}>
            <input type='text' placeholder='Login' className='input' name='username'></input>
            <br></br>
            <br></br>
            <br></br>
            <input type='email' placeholder='Email' className='input' name='email'></input>
            <br></br>
            <br></br>
            <br></br>
            <input type='password' placeholder='Hasło' className='input' name='password1'></input>
            <br></br>
            <br></br>
            <br></br>
            <input type='password' placeholder='Powtórz hasło' className='input' name='password2'></input>
            <br></br>
            <br></br>
            <button type='submit'>register</button>
          </form>
          
        </div>
      )
    }
  }
}
