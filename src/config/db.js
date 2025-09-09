import mongoose from "mongoose";
import dot_env_conf from "./dotenv.js";



const conectionDB = async () => {
    const dbName = 'studio_tattoo';
    const url = dot_env_conf.URLDB;

    try {
        const conn = await mongoose.connect(url, {dbName});
        console.log(`MongoDB connected`);
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1);
    }
}

export default conectionDB;