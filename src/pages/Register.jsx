import React, { useState } from 'react';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerStatus, setRegisterStatus] = useState('')

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            if (!response.ok) {
                const responseData = await response.json();
                throw new Error(responseData.message || 'Register failed');
            }
            setRegisterStatus("Register Sucessfull");
        } catch (error) {
            console.error('Register error:', error);
            let errorMessage = 'Registration failed';
            if (error.message.includes('already exists')) {
                errorMessage = 'User already exists. Please login';
            } else if (error.message.includes('required')) {
                errorMessage = 'All fields are required';
            }
            setRegisterStatus(errorMessage);
        }
    };
    

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegisterSubmit}>
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
                <button type="submit">Register</button>
                <h1>{registerStatus}</h1>
            </form>
        </div>
    );
};

export default Register;
