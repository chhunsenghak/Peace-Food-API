import { Request, Response } from "express";
import {
  getAllUsers as GetAllUsersService,
  getUserById as GetUserByIdService,
  updateUser as UpdateUserService,
  deleteUser as DeleteUserService,
} from "../services/user.service";


export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await GetAllUsersService();
    res.json({ data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await GetUserByIdService(req.params.id as string);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ data: user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const updateUser = async (req: Request, res: Response) => {
  try {
    const { email, username, role } = req.body;
    const user = await UpdateUserService(req.params.id as string, {
      email,
      username,
      role,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await DeleteUserService(req.params.id as string);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
