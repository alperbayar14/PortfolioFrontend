import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Our Premium Service</h1>
        <p>Join us to explore exclusive features and enjoy a world-class experience!</p>
      </header>
      <div className="button-container">
        <button className="login-button" onClick={() => navigate('/login')}>Login</button>
        <button className="signup-button" onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </div>
  );
}

export default Home;
