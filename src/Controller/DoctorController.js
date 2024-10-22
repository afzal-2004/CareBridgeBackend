import { UploadImage } from "../Utils/Cloudniary.js";

const addNewDoctor = async (req, res) => {
  const {
    name,
    speciality,
    doctorFees,
    experience,
    degree,
    appointmentTime,
    addresss,
    about,
  } = req.body;
  const avtar = req.file;

  console.log("This is My Avtar image uploaded", avtar);
  console.log("This is Path of My Uploaded File ", avtar.path);
  const imageurl = await UploadImage(avtar.path);
  console.log("This is My Image Url", imageurl);
  console.log(
    name,

    speciality,
    doctorFees,
    experience,
    degree,
    appointmentTime,
    addresss,
    about
  );
  const data = {
    name,

    speciality,
    doctorFees,
    experience,
    degree,
    appointmentTime,
    addresss,
    about,
  };
  return res.status(201).json({
    message: "All Done",
    data,
  });
};
export { addNewDoctor };
