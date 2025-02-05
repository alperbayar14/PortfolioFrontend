import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ImagePage.css';

const ImagePage = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/user/${username}/images`
                );
                setImages(response.data);
            } catch (error) {
                console.error('Error loading images:', error);
            }
        };
        fetchImages();
    }, [username]);

    return (
        <div className="gallery-container">
            <div className="gallery-header">
                <h1>{username}'s Collection</h1>
                <button onClick={() => navigate(-1)} className="back-btn">
                    Go Back
                </button>
            </div>

            <div className="image-grid">
                {images.map(image => (
                    <div 
                        key={image.id} 
                        className="image-card"
                        onClick={() => setSelectedImage(image)}
                    >
                        <img 
                            src={`http://localhost:8080${image.filepath}`}

                            alt={image.title}
                            onError={(e) => {
                                e.target.src = '/placeholder.jpg';
                                console.error('Failed to load:', image.filename);
                            }}
                        />
                        <div className="image-overlay">
                            <h3>{image.title}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div className="image-modal" onClick={() => setSelectedImage(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <img
                             src={`http://localhost:8080${selectedImage.filepath}`}
                             alt={selectedImage.title}
                        />
                        <div className="image-details">
                            <h2>{selectedImage.title}</h2>
                            <p>{selectedImage.explanation || 'No description available'}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImagePage;