import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import transporter from '../config/nodeMailer.js';
import {JWT_SECRET, TOKEN_EXPIRE, NODE_ENV,SENDER_EMAIL} from '../config/envConfig.js';

// Register a new user
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRE });

        res.cookie('token', token, {
            httpOnly: true,
            secure: NODE_ENV === 'production',
            sameSite: NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Send welcome email
        const mailOptions = {
            from: SENDER_EMAIL,
            to: email,
            subject: 'Welcome to MERN Auth',
            text: `Welcome to MERN Auth, ${name}.Your account has been created with email: ${email}`
        };

         await transporter.sendMail(mailOptions);

         return res.status(201).json({ success: true, message: 'User created successfully' });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Login a user
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: 'password is incorrect' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRE });

        res.cookie('token', token, {
            httpOnly: true,
            secure: NODE_ENV === 'production',
            sameSite: NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(200).json({ success: true, message: 'User logged in successfully' });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Logout a user
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: NODE_ENV === 'production',
            sameSite: NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 0
        });
        res.status(200).json({ success: true, message: 'User logged out successfully' });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// send verification otp
export const sendVerificationOtp = async (req, res) =>{
    try {
        const {userId} = req.body;
        
        const user = await User.findById(userId);
        if(user.isAccountVerified){
            return res.status(400).json({ success: false, message: 'Account already verified' });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();

        // Send OTP to user email
        const mailOptions = {
            from: SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Your account verification OTP is ${otp}. Veryfy your account using this OTP`
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: 'Verification OTP sent on Email' });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// verify email otp
export const veriryEmail = async (req, res) =>{
    const {userId, otp} = req.body;

    try {
        if(!userId || !otp){
            return res.status(400).json({ success: false, message: 'Missing Details' });
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if(user.verifyOtp === '' || user.verifyOtp !== otp){
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        if(user.verifyOtpExpireAt < Date.now()){
            return res.status(400).json({ success: false, message: 'OTP expired' });
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        await user.save();

        return res.status(200).json({ success: true, message: 'Account verified successfully' });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// is authenticated
export const isAuthenticated = async (req, res) =>{
    try {
        
        return res.status(200).json({ success: true, message: 'User is authenticated' });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// send password reset otp
export const sendResetOtp = async (req, res) =>{
    const {email} = req.body;
    if(!email){
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    try {
        
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
        await user.save();

        // Send OTP to user email
        const mailOptions = {
            from: SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your password reset OTP is ${otp}. Reset your password using this OTP`
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: 'Password reset OTP sent on Email' });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// reset user password
export const resetPassword = async (req, res) =>{
    const {email, otp, newPassword} = req.body;

    if(!email || !otp || !newPassword){
        return res.status(400).json({ success: false, message: 'Missing Details' });
    }

    try {
        
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if(user.resetOtp === '' || user.resetOtp !== otp){
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        if(user.resetOtpExpireAt < Date.now()){
            return res.status(400).json({ success: false, message: 'OTP expired' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;
        await user.save();

        return res.status(200).json({ success: true, message: 'Password reset successfully' });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}