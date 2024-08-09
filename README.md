# Setup with cloning
cd backend

npm install express sqlite3 bcryptjs jsonwebtoken body-parser dotenv
npm install axios
npm install cors
npm install react-scripts
npm install speakeasy qrcode

# Start backend
open new terminal
cd backend
node server.js

# To start frontend 
open a new terminal
cd securitybulletin
npm start

# Setup (without cloning)

open vs code

open new terminal within vs code 

npm install react-scripts

mkdir backend

cd backend

npm init -y

npm install express sqlite3 bcryptjs jsonwebtoken body-parser dotenv

npm install axios (securitybulletin)

npm install cors (backend)

npm install speakeasy qrcode

git checkout master

git pull origin master


# To start backend (mandatory for it to work)
open new terminal
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

