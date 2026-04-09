import mongoose from "mongoose";
import configs from "./config.js";

async function connectDb(): Promise<void> {
    try{
        await mongoose.connect((configs.MONGO_URI));
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);

    }
}

export default connectDb; 