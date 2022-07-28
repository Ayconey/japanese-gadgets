import React, { Component,useState } from 'react'
import { useSearchParams,Navigate } from 'react-router-dom';
import { Form,Button,Row,Col } from 'react-bootstrap';
import '../css/admin.css'
import axios from 'axios';

const Login = (props) => {
  //states
  const [Logged,updateLogged] = useState(false)
  const [SearchParams,SetSearchParams] = useSearchParams();
  const FromRegister = SearchParams.get('from-register') === 'true'
  
  // functions

  const try_login = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    axios.post('http://127.0.0.1:8000/api/token/',{'username':username,'password':password})
    .then((response)=>{
        let access = response.data.access
        let refresh = response.data.refresh
        props.SetToken(access,refresh)
        updateLogged(true);
    })
  }
  
  // return
    if (Logged){
      return <Navigate to='/'/>
    }else if(FromRegister){
      return (
        <div className='text-center' id="all_cont">
          <h3>Pomyślnie się zarejestrowałeś! Możesz teraz zalogować się do konta.</h3>
          <h2>Zaloguj</h2>
          <form onSubmit={try_login}>
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
      )}else{
      return (
        <div className='text-center' id="all_cont">
          <h2>Zaloguj</h2>
          <form onSubmit={try_login}>
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
export default Login;