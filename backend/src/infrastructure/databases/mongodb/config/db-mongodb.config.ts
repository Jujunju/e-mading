import mongoose from "mongoose";
import "dotenv/config"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`🍃 Database Ok`)
    } catch (error) {
        console.log(`🍃 Database Not Ok ${error}`);
    }
}