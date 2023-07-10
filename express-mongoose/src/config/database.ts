import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const DB_URL: string = process.env.DB_URL!;

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;
