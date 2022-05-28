import { useState, useEffect } from "react";
import {Routes,BrowserRouter as Router,Route } from 'react-router-dom'
import { Navigation } from "./components/navigation";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";


//pages
import "./App.css";
import Home from "./pages/home";


export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Navigation />

      <Router>
        <Routes>
          <Route path="/" element={<Home landingPageData={landingPageData} />} ></Route>
        </Routes>
      </Router>

      <Contact data={landingPageData.Contact} />
    </div>
  );
};

export default App;
