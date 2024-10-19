import mongoose, { Types } from "mongoose";
const adminSchema = new mongoose.Schema(
  {
    Mobile: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Admin = mongoose.model("Admin", adminSchema);
