import express from "express";
import mongoose from "mongoose";
import authRoutes from "./auth/authRoutes.js";
import cors from "cors";

const PORT = process.env.PORT || 5000;
const DB_API = "mongodb+srv://admin:admin@cluster0.tshqccs.mongodb.net/?retryWrites=true&w=majority";
const app = express();


const start = async () => {
    try {
        await mongoose.connect(DB_API);
        app.listen(PORT, () => console.log(`The post has been started on PORT ${PORT}`));
        app.use(cors())
        app.use(express.json());
        app.use('/auth', authRoutes);
    } catch (e) {
        console.log(e)
    }
}

start();

