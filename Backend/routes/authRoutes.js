import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { JWT_SECRET, TOKEN_EXPIRE, NODE_ENV } from "../config/envConfig.js";
import {
  login,
  register,
  logout,
  sendVerificationOtp,
  veriryEmail,
  isAuthenticated,
  resetPassword,
  sendResetOtp,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/send-verify-otp", userAuth, sendVerificationOtp);
router.post("/verify-email", userAuth, veriryEmail);
router.get("/is-auth", userAuth, isAuthenticated);
router.post("/send-reset-otp", sendResetOtp);
router.post("/reset-password", resetPassword);

// Google OAuth routes

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRE,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect("https://mern-auth-rust.vercel.app");
  }
);

export default router;
