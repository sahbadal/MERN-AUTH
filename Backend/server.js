import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { PORT } from './config/envConfig.js';
import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoute.js';

const app = express();

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json(express.urlencoded({ extended: true })));

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
    res.send('<h1>Server is runnig</h1>');
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);


app.listen(PORT, () => {
  console.log(`Server is running on : http://localhost:${PORT}`);
});
