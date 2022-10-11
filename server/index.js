import express from "express";
import mongoose from "mongoose";
import authRoutes from "./auth/authRoutes.js";
import cors from "cors";
import * as dotenv from 'dotenv';
import errorMiddleware from "./middleware/error-middleware.js";
import cookieParser from 'cookie-parser';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRoutes);
app.use(errorMiddleware);


const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        app.listen(PORT, () => console.log(`The post has been started on PORT ${PORT}`));

    } catch (e) {
        console.log(e)
    }
}

start();
