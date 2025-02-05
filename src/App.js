import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup'; // Signup bileşenini içe aktarın
import Login from './components/Login';
import UserPage from './components/UserPage';
import ImagePage from './components/ImagePage'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} /> {/* Signup bileşeninin rotası */}
        <Route path="/login" element={<Login/>} />
        <Route path="/user/:username" element={<UserPage/>}/>
        <Route path="/user/:username/images" element={<ImagePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
