import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/AxiosConfig';
import { jwtDecode } from 'jwt-decode';
import './Login.css';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/user/login', { 
                email, 
                password 
            });
            
            const { token } = response.data;
            localStorage.setItem('authToken', token);

            const decodedToken = jwtDecode(token);
            const username = decodedToken.sub;

            if (!username) {
                setErrorMessage('Authentication token is missing username');
                return;
            }

            navigate(`/user/${username}`);

        } catch (error) {
            if (error.response?.status === 401) {
                setErrorMessage('Invalid email or password');
            } else {
                setErrorMessage('Login failed. Please try again later.');
            }
        }
    };

    return (
        <div className="auth-container">
            <h2>User Login</h2>
            <form onSubmit={handleLogin} className="auth-form">
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
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <div className="auth-actions">
                    <button type="submit" className="primary-btn">
                        Login
                    </button>
                    <button
                        type="button"
                        className="secondary-btn"
                        onClick={() => navigate('/')}
                    >
                        Back to Home
                    </button>
                </div>

                <div className="auth-redirect">
                    <span>Don't have an account? </span>
                    <button 
                        type="button" 
                        className="text-btn"
                        onClick={() => navigate('/signup')}
                    >
                        Create Account
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;