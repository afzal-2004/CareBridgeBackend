import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    MobileNumber: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    useravtar: {
      type: String,
    },
    Addreess: {
      type: String,
    },
    DOB: {
      type: String,
    },
    Gender: {
      type: String,
    },
  },
  { timestamps: true }
);
export const user = mongoose.model("user", userSchema);
