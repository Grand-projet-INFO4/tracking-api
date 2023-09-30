import mongoose from "mongoose";

/**
 * Initializes the connection to the MongoDB database
 */
export async function connectDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string, {
      autoIndex: false,
      autoCreate: false,
    });
    console.log(`Connected to the MongoDB database ...`);
  } catch (error) {
    console.log(`Failed to connect to the MongoDB database ...`, error);
  }
}
