import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            alert('Login successful');
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.error);
            } else {
                alert('Login failed');
            }
        }
    };

    return (
        <div>
            <h3>Already Have an Account?</h3>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
