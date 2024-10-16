import bcrypt from "bcrypt";
import { user } from "../Models/userModel.js";
import { genratreAccessToken } from "../Utils/JwtSecret.js";

const Register = async (req, res) => {
  const { name, email, Mobilenumner, Password, Address, Gender, DOB } =
    req.body;
  try {
    console.log(name, email, Mobilenumner, Password, Address, Gender, DOB);
    const Finduser = await user.findOne({
      $or: [{ email: email }, { MobileNumber: Mobilenumner }],
    });
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
      const token = genratreAccessToken(RegisterUser._id);

      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });

      return res.status(201).json({
        message: "User Registerd Succeffuly ",
        RegisterUser,
        token,
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
    const finduser = await user.findOne({
      $or: [{ email: emailOrMobile }, { MobileNumber: emailOrMobile }],
    });

    if (!finduser) {
      return res.status(404).json({
        message: "Incorrect Password Or Email",
      });
    }
    const PlainPassword = await bcrypt.compare(Password, finduser.Password);

    if (!PlainPassword) {
      return res.status(401).json({
        finduser,
        message: "Incorrect Password  ",
      });
    }
    const token = createSecretToken(user._id);
    console.log("This is My Token On  Baknd Login Controller ", token);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    return res.status(201).json({
      message: "Logged in SuccesFully ",
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
  const tokrn = genratreAccessToken(user._id);
  res.clearCookie("token", {
    httpOnly: true,
  });
  return res.status(201).json({
    message: "user Logout Succefully ",
  });
};
export { Register, Login, Logout };
