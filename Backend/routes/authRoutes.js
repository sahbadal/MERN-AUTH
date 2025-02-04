import express from 'express';
import { login, register,logout,sendVerificationOtp } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/send-verification-otp', sendVerificationOtp);

export default router;