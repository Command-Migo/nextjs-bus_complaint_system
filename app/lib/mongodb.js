import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // below line to Check the state of the connection
    if (mongoose.connection.readyState === 0) {
      // await mongoose.connect( 'mongodb+srv://siegen:HBQQ4NoBhNmrHimp@cluster0.r7vgfyp.mongodb.net/complaintsSystem');
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("db connected");
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;