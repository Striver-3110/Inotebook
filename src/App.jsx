import "./App.css";
import React from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/note/NoteState.js";

function App() {
  return (
    <NoteState>
      <React.StrictMode>
          <Router>
            <Navbar />
            <Routes>
              <Route
                exact
                path="/"
                element={
                    <Home />
                }
              />
              <Route
                exact
                path="/about"
                element={
                    <About />
                }
              />
            </Routes>
          </Router>

      </React.StrictMode>
    </NoteState>
  );
}

export default App;
