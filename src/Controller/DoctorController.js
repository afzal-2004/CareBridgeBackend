import { UploadImage } from "../Utils/Cloudniary.js";
import { Doctor } from "../Models/DoctorModel.js";
import getDataUri from "../Utils/DataUri.js";
const addNewDoctor = async (req, res) => {
  const {
    name,
    speciality,
    email,
    doctorFees,
    experience,
    degree,
    appointmentTime,
    addresss,
    about,
  } = req.body;

  const avtar = req.file;
  console.log("This is My Avtar", avtar);

  const FindDoctor = await Doctor.findOne({ email });
  const imageurl = await UploadImage(avtar.path);
  // console.log("This is My image Url Saved In DataBase", imageurl.url);
  //  Check Doctor Existed Or Not

  try {
    if (FindDoctor) {
      return res.status(502).json({
        message: "Doctor is Already  Existed ",
      });
    }
    const AddDoctor = new Doctor({
      name,
      avtar: imageurl.url,
      speciality,
      email,
      doctorFees,
      experience,
      degree,
      appointmentTime,
      addresss,
      about,
    });
    const doctor = await AddDoctor.save();
    return res.status(201).json({
      message: "Doctor Are Added Succesfully ",
      doctor,
    });
  } catch (error) {
    console.log(error);
    return res.status(502).json({
      message: "Something Went Wrong",
    });
  }
};

const AccessDoctor = async (req, res) => {
  try {
    const data = await Doctor.find({});
    return res.status(201).json({
      message: "This is data  Get From backend ",
      data,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Something Went Wrong ",
    });
  }
};
const deleteDoctor = async (req, res) => {
  const id = req.params;
  console.log("this is id Passed By  My Frountend ", id);
  try {
    if (!FindDoctor) {
      return res.status(404).json({
        message: "Something Went Wrong",
      });
    }
    const FindDoctor = await Doctor.findByIdAndDelete({ id });
    return res.status(201).json({
      message: "Doctor Deletd Sucessfuly ",
      FindDoctor,
    });
  } catch (error) {
    return res.status(502).json({
      message: "Something Error",
    });
  }
};
export { addNewDoctor, AccessDoctor, deleteDoctor };
