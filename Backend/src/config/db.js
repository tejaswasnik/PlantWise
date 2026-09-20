import mongoose from "mongoose";
import dns from "dns";
import config from "./config.js";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
async function connectDB() {
  try {
    const connect = await mongoose.connect(config.MONGO_URI).then(() => {
      console.log("MongoDB connected successfully");
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}

export default connectDB;
