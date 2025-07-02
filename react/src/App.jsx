import React, { useState } from 'react';
import Home from './components/Home';
import Character from './components/Characters'; 
import Film from './components/Films';
import Planet from './components/Planets';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route path="/character/:id" element={<Character />} />
        <Route path="/film/:id" element={<Film />} />
        <Route path="/planet/:id" element={<Planet />} />
      </Routes>
    </Router>
  );
}

export default App;
