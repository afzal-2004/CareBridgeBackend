import mongoose, { model, Schema } from "mongoose";
const AppointedDoctorSchema = new mongoose.Schema(
  {
    Doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor", // Reference to the Doctor model
    },
    Date: {
      type: String,
      require: true,
    },
    appointedBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    appointedTime: {
      type: String,
    },
  },
  { timestamps: true }
);
export const Appintment = mongoose.model("Appintment", AppointedDoctorSchema);
