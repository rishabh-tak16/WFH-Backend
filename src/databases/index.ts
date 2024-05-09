import mongoose from "mongoose";
import {MONGO_URL} from "../constants/common";

const connectToDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("DB connection Created");
    } catch (err) {
        console.log("Organization DB Connection Failed", err);
    }
};

export default connectToDB;
