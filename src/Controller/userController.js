import bcrypt from "bcrypt";
import { user } from "../Models/userModel.js";
import { genratreAccessToken } from "../Utils/JwtSecret.js";
import { Doctor } from "../Models/DoctorModel.js";
import { Appintment } from "../Models/AppointedDoctor.js";
import mongoose from "mongoose";
const Register = async (req, res) => {
  const { name, email, Mobilenumner, Password, Address, Gender, DOB } =
    req.body;
  try {
    //   find  user on the the  bases of  email and mobileNumber
    const Finduser = await user.findOne({
      $or: [{ email: email }, { MobileNumber: Mobilenumner }],
    });
    //  check already not existed
    if (!Finduser) {
      const HashPassword = await bcrypt.hash(Password, 10);

      const Newuser = new user({
        name: name,
        email: email,
        MobileNumber: Mobilenumner,
        Password: HashPassword,
        Addreess: Address,
        DOB: DOB,
        Gender: Gender,
      });

      const RegisterUser = await Newuser.save();

      return res.status(201).json({
        message: "User Registerd Succeffuly ",
        RegisterUser,
      });
    } else {
      return res.status(409).json({
        message: "User is Already existed ",
      });
    }
  } catch (error) {
    return res.status(502).json({
      message: "Something Went Wrong ",
    });
  }
};

const Login = async (req, res) => {
  const { emailOrMobile, Password } = req.body;

  try {
    //  Find user on the bases of email or mobile number
    const finduser = await user.findOne({
      $or: [{ email: emailOrMobile }, { MobileNumber: emailOrMobile }],
    });
    //  check user in db
    if (!finduser) {
      return res.status(404).json({
        message: "Incorrect Password Or Email",
      });
    }
    // Compare Password
    const PlainPassword = await bcrypt.compare(Password, finduser.Password);

    if (!PlainPassword) {
      return res.status(401).json({
        finduser,
        message: "Incorrect Password  ",
      });
    }
    //  genrate An refresh Token  and Save in cookie or localstorage
    const token = genratreAccessToken(finduser._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
    });
    return res.status(201).json({
      message: "Logged in SuccesFully ",
      finduser,
      token,
    });
  } catch (error) {
    return res.status(502).json({
      details: error.details,
      message: "SomeThing Bad Request",
    });
  }
};

const Logout = async (req, res) => {
  try {
    //    Clear the cookie or local storage Jwt Token
    const User = req.user;
    const FindUser = await user.findById(User.id);

    res.clearCookie("token", {
      httpOnly: true,
    });

    return res.status(201).json({
      message: "user Logout Succefully ",
      FindUser,
    });
  } catch (error) {
    return res.status(502).json({
      message: " Something Went Wrong ",
    });
  }
};
const UserProfile = async (req, res) => {
  try {
    //  take data of current login user
    const UserProfiledata = req.user;
    const FindUser = await user.findById(UserProfiledata.id);
    return res.status(201).json({
      message: "This  is Current user Login Profile data ",
      FindUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something  Went Wrong",
    });
  }
};
const AppointedDoctor = async (req, res) => {
  //  take  Doctor id  from the User Prams
  const id = req.params.id;
  //    Access Current Login user
  const CurrentUserid = req.user;
  const { date, appointedTime } = req.body;

  // console.log(date, appointedTime, CurrentUserid.id);

  try {
    const AppointedDoctor = new Appintment({
      Doctor: id,
      Date: date,
      appointedBy: CurrentUserid.id,
      appointedTime: appointedTime,
    });

    const Appointdoctor = await AppointedDoctor.save();

    return res.status(200).json({
      message: "Doctor  Appointed",
      Appointdoctor,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Something Went Wrong  ",
    });
  }
};

const AccessAppointedDoctor = async (req, res) => {
  try {
    const CurrentUserid = req.user;
    const findDoctor = await Appintment.find({});
    // console.log(findDoctor);
    if (findDoctor) {
      const findAppointDoctor = await Appintment.findOne({
        appointedBy: CurrentUserid.id,
      });

      return res.status(201).json(findAppointDoctor);
    }
    return res.status(201).json(findDoctor);
    // console.log(findAppointDoctor);
  } catch (error) {
    return res.status(400).json({
      message: "Somethig Went Wrong ",
    });
  }
};
const DeletedAppointedDoctor = async (req, res) => {
  const id = req.params.id;
  console.log("This is id My currenyt bokked doctor ", id);
  //  find id From Appointed Doctor databasees
  try {
    const DeletedAppointed = await Appintment.findOneAndDelete({
      Doctor: id,
    });
    if (DeletedAppointed) {
      return res.status(201).json({
        message: " Doctor deleted Succesfully ",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Something went wrong here ",
    });
  }
};

export {
  Register,
  Login,
  Logout,
  UserProfile,
  AppointedDoctor,
  AccessAppointedDoctor,
  DeletedAppointedDoctor,
};
