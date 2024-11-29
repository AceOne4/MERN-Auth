import express from "express";
import {
  checkAuth,
  forgetPassword,
  login,
  logout,
  resetPassword,
  signup,
  verifyEmail,
} from "../controller/auth.control.js";
import { verifToken } from "../middleware/verifToken.js";

const route = express.Router();

route.get("/check-auth", verifToken, checkAuth);
route.post("/signup", signup);
route.post("/login", login);
route.post("/logout", logout);
route.post("/verify-email", verifyEmail);
route.post("/forget-password", forgetPassword);
route.post("/reset-password/:token", resetPassword);

export default route;
