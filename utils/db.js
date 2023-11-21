import mongoose from "mongoose";

const connectDB = async (URI) => {
  try {
    mongoose.connect(URI);
    console.log("connection successfully");
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

export { connectDB };
