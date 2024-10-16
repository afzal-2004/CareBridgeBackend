import bcrypt from "bcrypt";
import { user } from "../Models/userModel.js";

const Register = async (req, res) => {
  const {
    name,
    email,
    Mobilenumner,
    Password,
    Address,
    Gender,
    DOB,
  } = req.body;
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
      console.log("Registererd user in Db is", RegisterUser);
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
export { Register };
