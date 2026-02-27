import bcrypt from "bcrypt";
import { IUser } from "../models/user";
import { UserDAO } from "../dao/user.dao";
import { ConflictError, NotFoundError, BadRequestError } from "../utils/error";
import { JWT_SECRET } from "../config/jwt";

export const registerUser = async (userData: IUser) => {
  try {
    const existingUser = await UserDAO.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictError("EMAIL_ALREADY_EXISTS");
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await UserDAO.create({
      ...userData,
      password: hashedPassword,
    });

    return { user };
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await UserDAO.findByEmail(email);
    if (!user) {
      throw new NotFoundError("EMAIL_NOT_FOUND");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestError("INVALID_PASSWORD");
    }
    return { user };
  } catch (error) {
    throw error;
  }
};
