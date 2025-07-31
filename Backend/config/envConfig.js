import dontenv from "dotenv";
dontenv.config();

export const {
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
} = process.env;
