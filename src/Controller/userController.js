import bcrypt from "bcrypt";
import { user } from "../Models/userModel.js";
import { genratreAccessToken } from "../Utils/JwtSecret.js";
import { Doctor } from "../Models/DoctorModel.js";
import { Appintment } from "../Models/AppointedDoctor.js";
import mongoose from "mongoose";

// Register New User
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
        PlainPassword: Password,
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

// Login  Controller For user
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

    const { Password: _, PlainPassword: __, ...safeUser } = finduser._doc;

    return res.status(201).json({
      message: "Logged in SuccesFully ",
      safeUser,
      token,
    });
  } catch (error) {
    return res.status(502).json({
      details: error.details,
      message: "SomeThing Bad Request",
    });
  }
};

//  LogOut Controller For user
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

// get User Profile By user id
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
// Appointed Doctor
const AppointedDoctor = async (req, res) => {
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
// Get ApproMent Doctor
const AccessAppointedDoctor = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Fetch all appointments for the user
    const appointments = await Appintment.find({ appointedBy: userId });

    if (!appointments.length) {
      return res.status(200).json({
        data: [],
        message: "No appointments found",
        success: true,
      });
    }

    // 2. Extract doctor IDs
    const doctorIds = appointments.map((app) => app.Doctor);

    // 3. Fetch all related doctors
    const doctors = await Doctor.find({ _id: { $in: doctorIds } });

    // 4. Merge appointments with doctors
    const result = doctors.map((doctor) => {
      const doctorAppointments = appointments.filter(
        (app) => app.Doctor.toString() === doctor._id.toString(),
      );

      return {
        ...doctor.toObject(),
        appointments: doctorAppointments,
      };
    });

    // 5. Final structured response
    return res.status(200).json({
      data: result,
      success: true,
    });
  } catch (error) {
    console.error("AccessAppointedDoctor Error:", error);

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//  Cancel Appointmnt Of of Doctor
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
        message: " Appointment Cancel Succesfully ",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Something went wrong here ",
    });
  }
};

//  get doctor By  Doctor id
const getDoctorDetails = async (req, res) => {
  const Doctor_id = req.params.id;
  try {
    const FindDoctor = await Doctor.findById(Doctor_id);
    console.log("This is My  find Dctor ", FindDoctor);

    if (!FindDoctor) {
      return res.status(404).json({
        Data: {
          status: false,
          message: "Doctor is Not Forund ",
        },
      });
    } else {
      return res.status(201).json({
        message: "This in the details of The Doctor ",
        Data: {
          data: FindDoctor,
          status: true,
        },
      });
    }
  } catch (error) {
    return res.status(501).json({
      message: "Something Went Wrong With Here ",
    });
  }
};

//  1. Adding Here Two To Three New Features Like Profile Photo Update
//  2. Rajor Pay Intregation
//  3. Update User profile Controller
// 4.  Genrate Doctor Bills
// 5. Protected All of  Routes And Chnage The Layout

export {
  Register,
  Login,
  Logout,
  UserProfile,
  AppointedDoctor,
  AccessAppointedDoctor,
  DeletedAppointedDoctor,
  getDoctorDetails,
};
