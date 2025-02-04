import express from 'express';
import { login, register,logout,sendVerificationOtp,veriryEmail } from '../controllers/authController.js';
import  userAuth  from '../middleware/userAuth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/send-verification-otp', userAuth, sendVerificationOtp);
router.post('/verify-email', userAuth, veriryEmail);

export default router;