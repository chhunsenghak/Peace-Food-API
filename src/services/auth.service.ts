import bcrypt from "bcrypt";
import { IUser } from "../models/user";
import { UserDAO } from "../dao/user.dao";

export const registerUser = async (userData: IUser) => {
  try {
    const existingUser = await UserDAO.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await UserDAO.create({ ...userData, password: hashedPassword });

    return { user };
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await UserDAO.findByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }
    return { user };
  } catch (error) {
    throw error;
  }
};
