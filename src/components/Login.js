import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.text();
                setMessage("Login successful!"); // Başarılı giriş mesajı
            } else if (response.status === 404) {
                setMessage("Email not found."); // E-posta eşleşmiyor
            } else if (response.status === 401) {
                setMessage("Invalid password."); // Şifre yanlış
            } else {
                setMessage("Login failed. Please try again.");
            }
        } catch (error) {
            setMessage(`An error occurred: ${error.message || error.toString()}`);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin} noValidate>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>} {/* Mesaj varsa göster */}
        </div>
    );
};

export default Login;
