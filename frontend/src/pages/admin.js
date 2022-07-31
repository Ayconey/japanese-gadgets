import React, { Component } from 'react'
import { Form,Button,Row,Col } from 'react-bootstrap';
import '../css/admin.css'
import axios from 'axios';
import Cookies from 'js-cookie'
import AdminComp from '../customComponents/AdminComp';

export default class Admin extends Component {
    constructor(props){
        super(props);
        this.state = {
          admin:false,
        }
    }
  check_is_admin = ()=>{
    const headers = {
      'content-type':'application/json',
      'Authorization': `Bearer ${Cookies.get('access')}`,
    }
    axios.get('http://127.0.0.1:8000/api/users/is_admin/',{headers:headers})
    .then((response)=>{
  
        this.setState({admin:true});
    })
  }
  componentDidMount(){
    this.check_is_admin()
  }

  render() {
    if (this.state.admin){
      return <AdminComp/>
    }else{
      return (
        <div className='text-center' id="all_cont">
          <h2>You are not an admin!</h2>
          
        </div>
      )
    }
  }
}
