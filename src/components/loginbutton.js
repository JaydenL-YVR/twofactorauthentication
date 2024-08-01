// src/components/LoginButton.jsx
import React from 'react';

const LoginButton = ({ isVerified, onLogin }) => {
    const handleClick = () => {
        if (isVerified) {
            onLogin();
        } else {
            alert('Verify with 2FA first');
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`w-full p-2 rounded ${isVerified ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
        >
            Login to 23andMe
        </button>
    );
};

export default LoginButton;
