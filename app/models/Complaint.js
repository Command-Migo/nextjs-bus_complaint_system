import mongoose, { Schema } from "mongoose";

const ComplaintSchema = new Schema({
    fullname: {
      type: String,
      required: [true, "Full Name is required."],
      trim: true,
      minLength: [2, "Full Name must be at least 2 characters long."],
      maxLength: [50, "Full Name must not exceed 50 characters."],
    },
  
    email: {
      type: String,
      required: [true, "Email is required."],
      match: [
        /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i,
        "Invalid email address. Please enter a valid email.",
      ],
    },
  
    busNumber: {
      type: Number,
      required: [true, "Number of Bus is required."],
      min: [1, "Number of Bus must be a positive number."],
    },
  
    tripNumber: {
      type: Number,
      required: [true, "Number of Trip is required."],
      min: [1, "Number of Trip must be a positive number."],
    },
  
    complaint: {
      type: String,
      required: [true, "Your Complaint is required."],
    },
  
    date: {
      type: Date,
      default: Date.now,
    },
  });
  
  const Complaint =
    mongoose.models.Complaint || mongoose.model("Complaint", ComplaintSchema);
  
  export default Complaint;
  