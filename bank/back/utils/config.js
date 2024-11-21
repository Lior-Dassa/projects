import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

try {
    mongoose.connect(MONGO_URI);
} catch (error) {
    console.log(error.message);
    process.exit(0);
}

process.on('SIGINT', () => {
    mongoose.connection.close();
    process.exit(0);
  });
  