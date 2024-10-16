import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
cloudinary.config({
  cloud_name: process.env.CLOUDNIARY_CLOUD_NAME,
  api_key: process.env.CLOUDNIARY_API_KEY,
  api_secret: process.env.CLOUDNIARY_API_SECRET,
});
const UploadImage = async (path, folder = "my-profile") => {
  try {
    const uploadResult = await cloudinary.uploader.upload(path, {
      folder: folder,
    });
    console.log(uploadResult);

    return { url: uploadResult.secure_url, publicId: data.public_id };
  } catch (error) {
    console.log(err);
    throw err;
  }
};
export default UploadImage;
