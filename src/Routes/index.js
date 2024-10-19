import { Router } from "express";
import {
  Login,
  Register,
  Logout,
  UserProfile,
} from "../Controller/userController.js";

import { addNewDoctor } from "../Controller/DoctorController.js";
import {
  adminRegistraction,
  adminLogin,
  adminLogout,
} from "../Controller/adminController.js";
import { Auth } from "../../Middleware/Auth.js";
const router = Router();

//  user Routes
router.post("/Register", Register);
router.post("/Login", Login);
router.post("/Logout", Auth, Logout);
router.get("/Userprofile", Auth, UserProfile);

//   admin  Routes
router.post("/adminRegister", adminRegistraction);
router.post("/adminLogin", adminLogin);
router.post("/adminLogout", Auth, adminLogout);
//   admin    Operation Route
router.get("/addNewDoctor", addNewDoctor);

export default router;
