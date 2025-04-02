import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Atlas from "./pages/Atlas";
import data from "./data.json";
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import PyraAI from "./pages/PyraAI";
import "./App.css";

const App = () => {
  const [selectedStructure, setSelectedStructure] = useState(null);

  return (
    <Router>
      <Navbar /> 
      {/* <Map /> */}
      <div> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/atlas" element={<Atlas />} />
          <Route path="/atlas/:id" element={<Atlas selectedStructure={selectedStructure} />} />
          <Route path="/pyra-ai" element={<PyraAI />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
