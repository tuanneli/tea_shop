import express from "express";
import * as mongoose from "mongoose";
import authRouters from './auth/authRouters';

require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();
const DB_API = "mongodb+srv://admin:admin@cluster0.tshqccs.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json());
app.use('/auth', authRouters);

const start = async () => {
    try {
        await mongoose.connect(DB_API);
        app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();