import React, { useState } from 'react';
import axios from '../services/AxiosConfig';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSignup = async (event) => {
        event.preventDefault();
    
        if (email !== confirmEmail) {
            setMessage("Emails do not match");
            setIsError(true);
            return;
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMessage("Invalid email format");
            setIsError(true);
            return;
        }
    
        if (password.length < 6) {
            setMessage("Password must be at least 6 characters");
            setIsError(true);
            return;
        }
    
        if (username.length < 6) {
            setMessage("Username must be at least 6 characters");
            setIsError(true);
            return;
        }
        if (password.length > 20) {
            setMessage("Password must be shorter than 20 characters");
            setIsError(true);
            return;
        }
    
        if (username.length > 20) {
            setMessage("Username must be shorter than 20 characters");
            setIsError(true);
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:8080/api/user/register', 
                { email, username, password },
                
                  
                
            );
    
            if (response.status === 201) {
                setMessage("Registration successful! Redirecting...");
                setIsError(false);
                
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (error) {
            let errorMsg = 'Registration failed';
            
            if (error.response?.data) {
                const backendErrors = error.response.data;
                const errorMessages = [];
                
                if (backendErrors.email) errorMessages.push(backendErrors.email);
                if (backendErrors.username) errorMessages.push(backendErrors.username);
                if (backendErrors.error) errorMessages.push(backendErrors.error);
                
                if (error.response.status === 400) {
                    Object.values(backendErrors).forEach(msg => errorMessages.push(msg));
                }
    
                if (errorMessages.length > 0) {
                    errorMsg = errorMessages.join(', ');
                }
            }
            
            setMessage(errorMsg);
            setIsError(true);
        }
    };

    return (
        <div className="auth-container">
            <h2>Create Account</h2>
            <form onSubmit={handleSignup} className="auth-form">
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Confirm Email:</label>
                    <input
                        type="email"
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                        placeholder="Confirm your email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password"
                        required
                    />
                </div>

                {message && (
                    <div className={`message ${isError ? 'error' : 'success'}`}>
                        {message}
                    </div>
                )}

                <button type="submit" className="primary-btn">
                    Create Account
                </button>

                <div className="auth-redirect">
                    <span>Already have an account? </span>
                    <button
                        type="button"
                        className="secondary-btn"
                        onClick={() => navigate('/login')}
                    >
                        Log In
                    </button>
                </div>

                <div className="auth-redirect">
                    <button
                        type="button"
                        className="home-btn"
                        onClick={() => navigate('/')}
                    >
                        Go Back to Home
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Signup;