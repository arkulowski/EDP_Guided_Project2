import React, { useState } from 'react';
import Home from './components/Home';
import Character from './components/Characters'; // Ensure this matches the file name
import characters from './assets/characters.json';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';

function App() {
  const [character, setCharacter] = useState();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home characters={characters} setCharacter={setCharacter} />} />
        <Route path="/character/:id" element={<Character character={character} />} />
      </Routes>
    </Router>
  );
}

export default App;
