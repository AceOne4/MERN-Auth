import mongoose from "mongoose";

const UerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    name: { type: String, required: true },
    lastLoginDate: { type: Date, default: Date.now() },
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verficationToken: String,
    verficationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UerSchema);
