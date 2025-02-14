import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { PORT } from './config/envConfig.js';
import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoute.js';
// import configurePassport from './config/passport.js';

const app = express();


// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// configurePassport(app);
// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
    res.send('<h1>Server is runnig</h1>');
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on : http://localhost:${PORT}`);
});
