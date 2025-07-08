import mongoose from "mongoose";
import { DB_URI } from "./env";
export const connectToDatabase = () => {
  try {
    mongoose.connect(DB_URI);
    console.log("Database connect", DB_URI);
  } catch (err) {
    console.error("Database connection error:", err);
    throw err;
  }
};


