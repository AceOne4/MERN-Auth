export type TUser = {
  email: string;
  password: string;
  name: string;
  lastLoginDate: Date;
  isVerified: boolean;
  resetPasswordToken?: string;
  resetPasswordExpiresAt?: Date;
  verificationToken?: string;
  verificationTokenExpiresAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TRespond = {
  success: boolean;
  message: string;
  user?: TUser;
};
