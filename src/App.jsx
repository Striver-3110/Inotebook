import './App.css'
import React, { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NoteState from './context/note/NoteState.js'
import Alert from './components/Alert.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
function App() {
  const [alert, setAlert] = useState({ type: '', message: '' });
  const showAlert = (alert) => { // this alert is an object that contains type and message
    setAlert({ type: alert.type, message: alert.message })
    setTimeout(() => {
      setAlert('')
    }, 1500)
    
  }
  return (
    <NoteState>
      <React.StrictMode>
        <Router>
          <Navbar/>
          <Alert alert={alert} />
          <Routes>
            <Route exact path='/' element={<Home showAlert={showAlert} />} />
            <Route
              exact
              path='/about'
              element={<About showAlert={showAlert} />}
            />
            <Route
              exact
              path='/login'
              element={<Login showAlert={showAlert} />}
            ></Route>
            <Route
              exact
              path='/signup'
              element={<Signup showAlert={showAlert} />}
            ></Route>
          </Routes>
        </Router>
      </React.StrictMode>
    </NoteState>
  )
}

export default App
