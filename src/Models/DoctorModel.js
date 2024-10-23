import mongoose from "mongoose";
const DoctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avtar: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    doctorFees: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    appointmentTime: {
      type: Array,
      required: true,
    },
    addresss: {
      type: Object,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Doctor = mongoose.model("Doctor", DoctorSchema);
