# MERN-AUTH 🔐

A complete **Authentication System** built using the **MERN Stack** (MongoDB, Express, React, Node.js) with modern tools like **Tailwind CSS**, **JWT**, **Passport.js**, and **Nodemailer**.  
It includes **email/password signup**, **OTP-based verification**, **Google login**, **forgot/reset password**, and a clean, responsive UI.

---

## ✨ Features

- ✅ User Signup with name, email, password
- ✅ Email verification using OTP (via Nodemailer)
- ✅ Secure login using email & password
- ✅ Google OAuth login (`Continue with Google`) using Passport.js
- ✅ Forgot password with OTP-based reset flow
- ✅ JWT token authentication with HttpOnly Cookies
- ✅ Protected routes and session persistence
- ✅ Welcome message on successful login
- ✅ Profile section with email verification (if not done during signup)
- ✅ Built with modern stack: React + Tailwind CSS frontend

---

## 🧱 Tech Stack

### Frontend
- **React** (with hooks & router)
- **Tailwind CSS** (utility-first styling)

### Backend
- **Node.js + Express.js**
- **MongoDB** (via Mongoose)
- **JWT** for token-based auth
- **Passport.js** for Google OAuth
- **Nodemailer** for sending OTP emails
- **Cookies** for storing tokens securely

---
### Deployment
- ** Frontend(vercel)**
- ** Backend(render)**

  # 1. Clone the repository
git clone https://github.com/sahbadal/MERN-AUTH.git
cd MERN-AUTH

# 2. Setup Backend
cd server
npm install

# Create .env file
PORT,
  MONGO_URI,
  JWT_SECRET,
  TOKEN_EXPIRE,
  NODE_ENV,
  SMTP_USER,
  SMTP_PASSWORD,
  SENDER_EMAIL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  SESSION_SECRET,
  CLIENT_URL,

# Start backend
npm run dev

# Setup Frontend
cd Frontend
npm install 

# Create .env file 
VITE_BACKEND_URL

# Start backend
npm run dev


🙌 Author
Made with ❤️ by Badal Sah


## 📂 Project Structure (Simplified)

