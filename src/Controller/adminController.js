import { Admin } from "../Models/AdminModel.js";
import bcrypt from "bcrypt";
import { genratreAccessToken } from "../Utils/JwtSecret.js";
const adminRegistraction = async (req, res) => {
  const { Mobile, email, Password } = req.body;
  const hashpassword = await bcrypt.hash(Password, 10);

  try {
    const FindAdmin = await Admin.findOne({ email });

    if (!FindAdmin) {
      const admin = new Admin({
        Mobile: Mobile,
        email: email,
        password: hashpassword,
      });

      const saveData = await admin.save();
      return res.status(201).json({
        message: "Data Saved Succesfully ",
        saveData,
      });
    } else {
      return res.status(403).json({
        message: "User is Already Existed ",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "SomeThing Went Wrong ",
    });
  }
};
const adminLogin = async (req, res) => {
  const { emailOrMobile, Password } = req.body;
  console.log(emailOrMobile, Password);

  try {
    const FindUser = await Admin.findOne({
      $or: [{ email: emailOrMobile }, { Mobile: emailOrMobile }],
    });

    if (!FindUser) {
      return res.status(404).json({
        message: "Invalid Password Or Email ",
      });
    }

    const Decryptpassword = await bcrypt.compare(Password, FindUser.password);
    if (!Decryptpassword) {
      return res.status(402).json({
        message: "Invalid Password ",
      });
    }
    const AccessToken = await genratreAccessToken(FindUser.id);
    res.cookie("adminToken", AccessToken, {
      withCredentials: true,
      httpOnly: true,
    });
    return res.status(201).json({
      message: " Admin SuccesFully Login",
      AccessToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: "SomeThing Went Wrong",
    });
  }
};

const adminLogout = async (req, res) => {
  const admin = req.user;
  console.log("This is My Admin data After My next ", admin);
  const AdminData = await Admin.findById(admin.id);
  try {
    res.clearCookie("adminToken", {
      httpOnly: true,
    });
    return res.status(201).json({
      message: "Admin Logout Succefully ",
      AdminData,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
};
export { adminRegistraction, adminLogin, adminLogout };
