import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [namelist, setNamelist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.length >= 5) { 
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/user/home?userinput=${searchTerm}`);
          const data = await response.json();
          setNamelist(data); 
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    } else {
      setNamelist([]); 
    }
  }, [searchTerm]); 

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUserClick = (username) => {
    navigate(`/user/${username}/images`); 
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Search for user or image</h1>
      </header>
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search for a username to see collection" 
          value={searchTerm} 
          onChange={handleSearchChange} 
        />
        {namelist.length > 0 && (
          <ul className="results-list">
            {namelist.map((username, index) => (
              <li 
                key={index} 
                onClick={() => handleUserClick(username)}
                className="result-item"
              >
                <span className="username">{username}</span>
                <span className="view-profile">View Profile →</span>
              </li>
            ))}
          </ul>
        )}
        {namelist.length === 0 && searchTerm.length >= 5 && (
          <p className="no-results">No results found for "{searchTerm}"</p>
        )}
      </div>

      <div className="button-container">
        <button className="login-button" onClick={() => navigate('/login')}>Login</button>
        <button className="signup-button" onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </div>
  );
}

export default Home;