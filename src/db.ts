import mongoose from "mongoose";
import dotenv from "dotenv";
export const dbStatus = {
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting",
  99: "uninitialized",
};
dotenv.config();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.DB_CONNECTION_STRING as string
    );
    // console.log(conn.connection.readyState)
    // console.log(conn.connection);
    // console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn.connection.readyState;
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
