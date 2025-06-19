import mongoose from "mongoose";
import "dotenv/config";

const mongoURI = process.env.MONGO as string;

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Połączono z bazą MongoDB");
  } catch (error) {
    console.error("Błąd połączenia z bazą MongoDB:", error);
    process.exit(1);
  }
};
