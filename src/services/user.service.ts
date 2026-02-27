import { IUser } from "../models/user";
import { UserDAO } from "../dao/user.dao";

export const getAllUsers = async () => {
  try {
    const users = await UserDAO.findAll();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Internal server error");
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await UserDAO.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Internal server error");
  }
};

export const updateUser = async (id: string, userData: Partial<IUser>) => {
  try {
    const user = await UserDAO.update(id, userData);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Internal server error");
  }
};

export const deleteUser = async (id: string) => {
  try {
    const user = await UserDAO.delete(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Internal server error");
  }
};