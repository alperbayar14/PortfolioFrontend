import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup'; // Signup bileşenini içe aktarın

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} /> {/* Signup bileşeninin rotası */}
      </Routes>
    </Router>
  );
}

export default App;
