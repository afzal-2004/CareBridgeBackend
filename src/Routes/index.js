import { Router } from "express";
import { Register } from "../Controller/userController.js";
const router = Router();
router.post("/Register", Register);

export default router;
