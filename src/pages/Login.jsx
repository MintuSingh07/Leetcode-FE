import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            if (!response.ok) {
                throw new Error('Login failed');
            }
            setEmail('');
            setPassword('');
            window.location.href = "/";
        } catch (error) {
            console.error('Login error:', error);
            let errorMessage = 'Login failed';
            if (error.message.includes('Incorrect')) {
                errorMessage = 'Incorrect password';
            }
            setLoginStatus(errorMessage);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                {/* Display login status message */}
                <h1>{loginStatus}</h1>
            </form>
        </div>
    );
};

export default Login;
