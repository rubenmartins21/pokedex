import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import PokemonPage from "./pages/PokemonPage/PokemonPage";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon-details" element={<PokemonPage />} />
      </Routes>
    </Router>
  );
};

export default App;
