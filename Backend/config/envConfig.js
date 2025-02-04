import dontenv from 'dotenv';
dontenv.config();

export const {
    PORT,
    MONGO_URI,
    JWT_SECRET,
    TOKEN_EXPIRE,
    NODE_ENV,
    SMTP_USER,
    SMTP_PASSWORD,
    SENDER_EMAIL
    
} = process.env;