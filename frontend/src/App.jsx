import { useState, useEffect } from "react";
import {Routes,BrowserRouter as Router,Route } from 'react-router-dom'
import { Navigation } from "./components/navigation";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import Cookies from 'js-cookie'

//pages
import "./App.css";
import Home from "./pages/home";
import Shop from "./pages/Shop";
import Admin from "./pages/admin";
import Login from "./pages/Login";
export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  //states
  const [Token,updateToken] = useState('');
  const [landingPageData, setLandingPageData] = useState({});

  //functions
  useEffect(() => {
    setLandingPageData(JsonData);
    GetToken();
  }, []);

  const SetToken = (token) =>{
    Cookies.set('token',token)
  }
  const GetToken = () => {
    let token = Cookies.get('token')
    if(token){
      updateToken(token)
      console.log('tokened')
    }else{
      console.log('no token')
    }
    
    
  }

  return (
    <div>
      <Navigation />

      <Router>
        <Routes>
          <Route path="/" element={<Home landingPageData={landingPageData} />} ></Route>
          <Route path="/admin" element={<Admin />} ></Route>
          <Route path="/login" element={<Login SetToken={SetToken} />} ></Route>
          <Route path="/shop" element={<Shop  />} ></Route>
        </Routes>
      </Router>

      <Contact data={landingPageData.Contact} />
    </div>
  );
};

export default App;
