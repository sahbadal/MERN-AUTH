import express from 'express';
import { login, register,logout,sendVerificationOtp,veriryEmail,isAuthenticated,resetPassword,sendResetOtp } from '../controllers/authController.js';
import  userAuth  from '../middleware/userAuth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/send-verify-otp', userAuth, sendVerificationOtp);
router.post('/verify-email', userAuth, veriryEmail);
router.post('/is-auth', userAuth, isAuthenticated);
router.post('/send-reset-otp', sendResetOtp);
router.post('/reset-password', resetPassword);

export default router;