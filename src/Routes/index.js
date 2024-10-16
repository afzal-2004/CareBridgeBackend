import { Router } from "express";
import { Login, Register, Logout } from "../Controller/userController.js";
import { Auth } from "../../Middleware/Auth.js";
const router = Router();
router.post("/Register", Register);
router.post("/Login", Auth, Login);
router.post("/Logout", Auth, Logout);

export default router;
