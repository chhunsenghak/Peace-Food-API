import { Schema, model } from "mongoose";

export interface IUser {
    email: string;
    username: string;
    password: string;
    role: "student" | "instructor" | "admin";
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "instructor", "admin"], default: "student" },
}, { timestamps: true });

export const User = model<IUser>("User", userSchema);