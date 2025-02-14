import express from 'express';
import axios from 'axios'
import { CLIENT_URL } from '../config/envConfig.js';
import passport from 'passport';
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

// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// router.get('/google/callback', 
//   passport.authenticate('google', { failureRedirect: `${CLIENT_URL}/login` }), 
//   (req, res) => {
//       res.redirect(CLIENT_URL);
//   }
// );



export default router;
