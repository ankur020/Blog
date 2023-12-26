import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authController.js";

//router object
const router = express.Router();

//ROUTING

//register
router.post("/register", registerController);

//login
router.post("/login", loginController);

export default router;
