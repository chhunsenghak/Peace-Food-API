import { Schema, model } from "mongoose";
import { UserRole } from "../enum/userRole";

export interface IUser {
  email: string;
  username: string;
  password: string;
  phoneNumber?: string;
  role: UserRole;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.STAFF,
    },
  },
  { timestamps: true },
);

export const User = model<IUser>("User", userSchema);
