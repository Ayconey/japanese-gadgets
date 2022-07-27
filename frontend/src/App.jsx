import React,{ useState, useEffect,Component } from "react";
import {Routes,BrowserRouter as Router,Route } from 'react-router-dom'
import { Navigation } from "./components/navigation";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import Cookies from 'js-cookie'
import axios from 'axios'
//pages
import "./App.css";
import Home from "./pages/home";
import Shop from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import Admin from "./pages/admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/profile";
import YourOrders from "./pages/YourOrders";
import Cart from "./pages/Cart";
import CheckoutOrder from "./pages/CheckoutOrder";
import InfoPage from "./pages/InfoPage";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      landingPageData:[],
      logged:false,
      token:Cookies.get('access'),
    }
  }

  componentDidMount(){
    this.setState({landingPageData:JsonData});
    this.GetToken();
  }


  //token calls

  VerifyToken = (access,refresh) => {
    let headers = {
      'content-type':'application/json'
    }
    
    axios.post('http://127.0.0.1:8000/api/token/verify/',{'token':access},{headers:headers})
    .then(response => {
      
      this.setState({logged:true})
    })
    .catch(error=>{
      this.RefreshToken(refresh)
      
    })
  }

  RefreshToken = (refresh) => {
    let headers = {
      'content-type':'application/json'
    }

    axios.post('http://127.0.0.1:8000/api/token/refresh/',{'refresh':refresh},{headers:headers})
    .then(response => {
      let access = response.data.access;
      this.SetToken(access,refresh)
    })
    .catch(error=>{
      console.log(error)
      
    })
  }

  SetToken = (access,refresh) =>{
    Cookies.set('access',access)
    Cookies.set('refresh',refresh)
    this.setState({logged:true})
  }

  // this is where the magic is made
  GetToken = () => {
    let access = Cookies.get('access');
    let refresh = Cookies.get('refresh');
    this.VerifyToken(access,refresh)

  }

  render() {
    return (
      <div>
        <Navigation logged={this.state.logged} />
  
        <Router>
          <Routes>
            <Route path="/" element={<Home landingPageData={this.state.landingPageData} />} ></Route>
            <Route path="/admin" element={<Admin />} ></Route>
            <Route path="/info" element={<InfoPage />} ></Route>
            <Route path="/your-orders" element={<YourOrders />} ></Route>
            <Route path="/login" element={<Login SetToken={this.SetToken} />} ></Route>
            <Route path="/register" element={<Register />} ></Route>
            <Route path="/shop" element={<Shop />} ></Route>
            <Route path="/products:id" element={<ProductPage />} ></Route>
            <Route path="/profile" element={<Profile />} ></Route>
            <Route path="/cart" element={<Cart />} ></Route>
            <Route path="/checkout" element={<CheckoutOrder />} ></Route>
          </Routes>
        </Router>
  
        <Contact data={this.state.landingPageData.Contact} />
      </div>
    );
  }
}


