import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("connection successfully");
    mongoose.connect("mongodb://127.0.0.1:27017/mobileShop");
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

export { connectDB };
