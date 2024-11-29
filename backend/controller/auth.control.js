import bcryptjs from "bcryptjs";
import crypto from "crypto";

import {
  generateTokenandSetCookies,
  generateverficationCode,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationToken,
  sendWelcomeEmail,
} from "../utils/utils.js";
import { User } from "../models/user.model.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //check if all fields are valid
    if (!email || !password || !name)
      throw new Error("All Fields must be provided");
    //check if the user is already exist
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ succes: false, message: "User already exists" });
    // hash the password
    const hashPassword = await bcryptjs.hash(password, 10);
    //create a verification code to send to the user to verify the email
    const verficationToken = generateverficationCode();
    //create the user
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      verficationToken,
      verficationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    await newUser.save();
    //create jwt
    generateTokenandSetCookies(res, newUser._id);
    //send a verfiation number to the user Email
    await sendVerificationToken(email, verficationToken);
    return res.status(201).json({
      succes: true,
      message: "User created successfully",
      user: {
        ...newUser._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(400).json({ succes: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    //check if user exists
    if (!user)
      return res
        .status(400)
        .json({ succes: false, message: "invalid credentials" });

    //check if  provided password matches the password on the database
    const ispaswordValid = await bcryptjs.compare(password, user.password);
    if (!ispaswordValid)
      return res
        .status(400)
        .json({ succes: false, message: "invalid credentials" });

    // generate cookies and jwt token
    generateTokenandSetCookies(res, user._id);

    //update rhe last login date
    user.lastLoginDate = new Date();
    await user.save();

    res.status(200).json({
      succes: true,
      message: "login successful",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({ succes: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  // cleat the jwt from the cookie
  res.clearCookie("token");
  res.status(200).json({ succes: true, message: "loged out successfully" });
};

export const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;
    //check if the  token is valid and exists
    const user = await User.findOne({
      verficationToken: code,
      verficationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user)
      return res.status(400).json({
        succes: false,
        message: "Invalid or expired verification token",
      });

    //update isVerified and clear verication token and its date rom datbase
    user.isVerified = true;
    user.verficationToken = undefined;
    user.verficationTokenExpiresAt = undefined;
    await user.save();

    //send welcome Email
    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      succes: true,
      message: "Email verified succesfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ succes: false, message: "Server Error" });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    //find user and check if exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ succes: false, message: "User not found" });

    //generate forgetPasswordtoken and save to the database
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiry = Date.now() + 60 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiry;
    await user.save();

    //send a link for reset password to the user email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    return res.status(200).json({
      succes: true,
      message: "Password reset Link sent to your email",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({ succes: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: "Token and password are required",
      });
    }
    //find the user by the token and expiresdate and check if it exists
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user)
      return res.status(400).json({
        succes: false,
        message: "Invalid or expired reset token",
      });
    //hash the password , update it and clear reset token and ites date from datbase
    const hashPassword = await bcryptjs.hash(password, 10);

    user.password = hashPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    //send success Email
    await sendResetSuccessEmail(user.email);

    return res.status(201).json({
      succes: true,
      message: "Password Resat successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(400).json({ succes: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    //get the userbyid and check if its exist
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res.status(404).json({ succes: false, message: "User not found" });

    return res
      .status(200)
      .json({ succes: true, message: "the user Is Authacatied", user });
  } catch (error) {
    return res.status(400).json({ succes: false, message: error.message });
  }
};
