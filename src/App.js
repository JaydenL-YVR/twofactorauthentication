// src/App.jsx
import React, { useState } from 'react';
import './styles/App.css';
import Register from './components/Register';
import Login from './components/Login';
import TwoFactorAuth from './components/TwoFactorAuth';
import HomePage from './components/homepage';
import LoginButton from './components/loginbutton';

function App() {
    const [isVerified, setIsVerified] = useState(false);
    const [showHomePage, setShowHomePage] = useState(false);

    const handleVerification = (status) => {
        setIsVerified(status);
    };

    const handleLoginTo23andMe = () => {
        setShowHomePage(true);
    };

    return (
        <div className="App">
            {showHomePage ? (
                <HomePage />
            ) : (
                <>
                    <h1 className="text-blue-500">Security Bulletin</h1>
                    <div className="container">
                        <Register />
                    </div>
                    <div className="container">
                        <Login />
                    </div>
                    <div className="container">
                        <TwoFactorAuth onVerified={handleVerification} />
                    </div>
                    <div className="container">
                        <LoginButton isVerified={isVerified} onLogin={handleLoginTo23andMe} />
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
