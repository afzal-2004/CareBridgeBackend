import { Router } from "express";
import {
  Login,
  Register,
  Logout,
  UserProfile,
} from "../Controller/userController.js";
import { Auth } from "../../Middleware/Auth.js";
const router = Router();
router.post("/Register", Register);
router.post("/Login", Auth, Login);
router.post("/Logout", Auth, Logout);
router.get("/Userprofile", Auth, UserProfile);

export default router;
