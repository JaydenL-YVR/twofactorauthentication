# Setup

open vs code
mkdir backend
cd backend
npm init -y

npm install express sqlite3 bcryptjs jsonwebtoken body-parser dotenv

npm install axios (securitybulletin)

npm install cors (backend)

git checkout master

git pull origin master

# Secure front-end using 2fa
npm install speakeasy qrcode

# To start backend
cd backend
node server.js

# To start frontend 
open a new terminal
cd securitybulletin
npm start

# Use Case
Register new account
Login to that account
Input user id "1"
Generate QR code
Login to O-Auth (Authenticator) on mobile
Add new account, scan QR code.
Input the 6 digit code from the O-Auth into the input token on the 2FA website
Login to website to be taken to that new page

# Learnings
Understand the procedure of 2FA verification
