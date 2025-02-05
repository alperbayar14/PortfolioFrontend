import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './UserPage.css';

const UserPage = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [newImage, setNewImage] = useState({
        title: '',
        explanation: '',
        file: null
    });

    const handleLogout = useCallback(() => {
        localStorage.removeItem('authToken');
        navigate('/login');
    }, [navigate]);

   
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const decoded = jwtDecode(token);
            setIsAuthorized(decoded.sub === username);
        } catch (error) {
            handleLogout();
        }
    }, [username, navigate, handleLogout]);

  
    const handleFileChange = (e) => {
        setNewImage({...newImage, file: e.target.files[0]});
    };

const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', newImage.file); 
    formData.append('title', newImage.title);
    formData.append('explanation', newImage.explanation);
  
    try {
      const token = localStorage.getItem('authToken');
      await axios.post(
        `http://localhost:8080/api/user/${username}/image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      navigate(`/user/${username}/images`);
    } catch (error) {
      alert('Upload failed: ' + error.response?.data?.message);
    }
  };

    return (
        <div className="user-page-container">
            <div className="user-header">
                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
                <button 
                    onClick={() => navigate(`/user/${username}/images`)}
                    className="gallery-btn"
                >
                    View Gallery
                </button>
            </div>

            {isAuthorized && (
                <div className="upload-section">
                    <h2>Upload New Image</h2>
                    <form onSubmit={handleUpload}>
                        <input
                            type="text"
                            placeholder="Image Title"
                            value={newImage.title}
                            onChange={(e) => setNewImage({...newImage, title: e.target.value})}
                            required
                        />
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            required
                        />
                        <textarea
                            placeholder="Description"
                            value={newImage.explanation}
                            onChange={(e) => setNewImage({...newImage, explanation: e.target.value})}
                        />
                        <button type="submit" className="upload-btn">
                            Upload
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UserPage;