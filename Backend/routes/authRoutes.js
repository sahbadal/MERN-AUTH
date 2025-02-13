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

router.get(
  '/google/callback',
  passport.authenticate('google',{
    successRedirect: CLIENT_URL,
    failureRedirect: `${CLIENT_URL}/login`,
  })
)

router.get('/google',async (req,res) =>{
  try {
    const response = await axios.get("https://accounts.google.com/o/oauth2/v2/auth",{
      params:req.query
    })

    console.log(response);
    res.send(response)
    

  } catch (error) {
    res.json({success: false, error:"Internal server Error"})
  }

})


export default router;
