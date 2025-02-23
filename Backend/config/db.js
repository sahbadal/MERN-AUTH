import mongoose from "mongoose";
import { MONGO_URI } from "./envConfig.js";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${MONGO_URI}/mern-auth`);
        console.log(`Database Connected: ${conn.connection.host}`);

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;