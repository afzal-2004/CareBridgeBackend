import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
cloudinary.config({
  cloud_name: process.env.CLOUDNIARY_CLOUD_NAME,
  api_key: process.env.CLOUDNIARY_API_KEY,
  api_secret: process.env.CLOUDNIARY_API_SECRET,
});
const UploadImage = async (base64Image) => {
  try {
    if (!base64Image) return null;
    // console.log("this is My path", path);
    const uploadResult = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${base64Image}`
    );
    // console.log("Image uploaded successfully:", uploadResult);

    // fs.unlinkSync(path);
    return uploadResult;
  } catch (error) {
    // fs.unlinkSync(path);

    console.log(error);
  }
};
export { UploadImage };
