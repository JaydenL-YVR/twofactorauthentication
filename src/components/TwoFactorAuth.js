import React, { useState } from 'react';
import axios from 'axios';

const TwoFactorAuth = ({ onVerified }) => {
    const [userId, setUserId] = useState('');
    const [token, setToken] = useState('');
    const [qrcode, setQrcode] = useState('');

    const generate2FA = async () => {
        try {
            const response = await axios.post('http://localhost:5000/generate_2fa', { userId });
            setQrcode(response.data.qrcode);
        } catch (error) {
            alert(error.response.data.error);
        }
    };

    const verify2FA = async () => {
        try {
            const response = await axios.post('http://localhost:5000/verify_2fa', { userId, token });
            if (response.data.verified) {
                alert('2FA verified successfully');
                onVerified(true); // Notify App component about successful verification
            } else {
                alert('Invalid token');
            }
        } catch (error) {
            alert(error.response.data.error);
        }
    };

    return (
        <div>
            <h2>Two-Factor Authentication</h2>
            <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <button onClick={generate2FA}>Generate 2FA</button>
            {qrcode && <img src={qrcode} alt="2FA QR Code" />}
            <input
                type="text"
                placeholder="Token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
            />
            <button onClick={verify2FA}>Verify 2FA</button>
        </div>
    );
};

export default TwoFactorAuth;
