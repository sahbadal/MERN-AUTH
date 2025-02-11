import express from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET,TOKEN_EXPIRE } from '../config/envConfig.js';
// import passport from 'passport';
import { login, register, logout, sendVerificationOtp, veriryEmail, isAuthenticated, resetPassword, sendResetOtp } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/send-verify-otp', userAuth, sendVerificationOtp);
router.post('/verify-email', userAuth, veriryEmail);
router.get('/is-auth', userAuth, isAuthenticated);
router.post('/send-reset-otp', sendResetOtp);
router.post('/reset-password', resetPassword);

// //  Google OAuth Route (Login Initiation)
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// //  Google OAuth Callback Route (After Login)
// router.get('/google/callback', 
//     passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' ,scope: ['profile', 'email'] }),
//     async (req, res) => {
//       try {
//         console.log("Google Callback - User:", req.user);
//         const user = req.user;
//         if (!user) {
//           return res.redirect('http://localhost:5173/?error=UserNotFound');
//         }

//         // Generate JWT Token
//         const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRE });

//         // Redirect to frontend with token
//         res.redirect(`http://localhost:5173/login?token=${token}`);
        
//       } catch (error) {
//         console.error("Google Auth Callback Error:", error);
//         res.redirect('http://localhost:5173/login?error=InternalServerError');
//       }
//     }
// );

export default router;
