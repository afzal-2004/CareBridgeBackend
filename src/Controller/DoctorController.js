import { UploadImage } from "../Utils/Cloudniary.js";
import { Doctor } from "../Models/DoctorModel.js";

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
  // console.log("This is My Avtar", avtar);
  // console.log("This is the Buffer data For Store  Upload", avtar.buffer);
  // console.log(
  //   "This is the Buffer string Data For  Upload",
  //   avtar.buffer?.toString("base64")
  // );
  const File = avtar.buffer?.toString("base64");

  const FindDoctor = await Doctor.findOne({ email });
  // const imageurl = await UploadImage(avtar.path);
  const imageurl = await UploadImage(File);

  // console.log("This is My image Url Saved In DataBase", imageurl.url, req.body);
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
      email,
      speciality,
      doctorFees,
      experience,
      degree,
      appointmentTime,
      addresss,
      about,
    });
    // console.log("This is Data I Get Till Add Doctor ", AddDoctor);
    const doctor = await AddDoctor.save();
    // console.log("This is the Doctor saved in my db is ", doctor);
    return res.status(201).json({
      message: "Doctor Are Added Succesfully ",
      doctor,
    });
  } catch (error) {
    // console.log(error);
    return res.status(502).json({
      message: "Something Went Wrong",
    });
  }
};

const AccessDoctor = async (req, res) => {
  //  find all The Doctor this is Publiccialy Abalibe for  everyone
  try {
    const data = await Doctor.find({});
    return res.status(201).json(data);
  } catch (error) {
    return res.status(404).json({
      message: "Something Went Wrong ",
    });
  }
};
const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  console.log("This is The id Of this Doctor ", id);

  try {
    //  find the doctor bases on   id and delete This item  Doctor Deletion is Authecated Routes Only Admin   have To acess to delete Doctor

    const FindDoctor = await Doctor.findByIdAndDelete(id);
    if (FindDoctor) {
      return res.status(201).json({
        message: "Doctor Deletd Sucessfuly ",
        FindDoctor,
      });
    }
    return res.status(404).json(" Try some times Later ");
  } catch (error) {
    return res.status(502).json({
      message: "Something Error",
    });
  }
};
export { addNewDoctor, AccessDoctor, deleteDoctor };
