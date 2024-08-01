const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const cors = require('cors'); // Add this line

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const db = new sqlite3.Database(':memory:');

app.use(cors()); // Add this line
app.use(bodyParser.json());

// Create users table
db.serialize(() => {
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        secret TEXT
    )`);
});

// Register a user
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], (err) => {
        if (err) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        res.status(201).json({ message: 'User registered' });
    });
});

// Login a user
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
        if (err || !user || !bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});

// Generate 2FA
app.post('/generate_2fa', (req, res) => {
    const secret = speakeasy.generateSecret({ length: 20 });
    db.run(`UPDATE users SET secret = ? WHERE id = ?`, [secret.base32, req.body.userId], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error generating 2FA secret' });
        }
        qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
            if (err) {
                return res.status(500).json({ error: 'Error generating QR code' });
            }
            res.json({ secret: secret.base32, qrcode: data_url });
        });
    });
});

// Verify 2FA
app.post('/verify_2fa', (req, res) => {
    const { userId, token } = req.body;
    db.get(`SELECT secret FROM users WHERE id = ?`, [userId], (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: 'Invalid user' });
        }
        const verified = speakeasy.totp.verify({
            secret: user.secret,
            encoding: 'base32',
            token
        });
        if (verified) {
            res.json({ verified: true });
        } else {
            res.status(400).json({ error: 'Invalid token' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
