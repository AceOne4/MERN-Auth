import jwt from "jsonwebtoken";
import { client, sender } from "../mailtrap/mailtrap.config.js";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "../mailtrap/emailTempltes.js";
export const generateverficationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateTokenandSetCookies = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return token;
};

//Send Emails Functions
export const sendVerificationToken = async (email, token) => {
  const recipint = [{ email }];
  try {
    const response = client.send({
      from: sender,
      to: recipint,
      subject: "Verify Your Email ",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", token),
      category: "Email verification",
    });
    console.log("Email sent successfully", await response);
  } catch (error) {
    console.log(error);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipint = [{ email }];
  try {
    const response = client.send({
      from: sender,
      to: recipint,
      template_uuid: "c8d2543d-5bc8-42f6-b42a-0a712ef9741e",
      template_variables: {
        company_info_name: "Auth Company for Authantication",
        name: name,
      },
    });
    console.log("Welcome Email sent successfully", await response);
  } catch (error) {
    console.log(error);
  }
};

export const sendPasswordResetEmail = async (email, urlReset) => {
  const recipint = [{ email }];
  try {
    const response = client.send({
      from: sender,
      to: recipint,
      subject: "Reset Your Password ",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", urlReset),
      category: "Reset Password",
    });
    console.log("Email sent successfully", await response);
  } catch (error) {
    console.log(error);
  }
};

export const sendResetSuccessEmail = async (email) => {
  const recipint = [{ email }];
  try {
    const response = client.send({
      from: sender,
      to: recipint,
      subject: "Your Password has been Resat successfully",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Success Reset Password",
    });
    console.log("Email sent successfully", await response);
  } catch (error) {
    console.log(error);
  }
};
