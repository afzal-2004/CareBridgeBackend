import multer from "multer";
import path from "path";
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public");
//   },

//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + path.extname(file.originalname);
//     cb(null, uniqueName);
//     console.log("this is The name of My File", uniqueName);
//   },
// });
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });
export const singleUpload = upload.single("avtar");
