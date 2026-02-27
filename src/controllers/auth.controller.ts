import { Request, Response } from "express";
import { registerUser, loginUser} from "../services/auth.service";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt";
import { User } from "../models/user";
import { AuthRequest } from "../middleware/auth.middleware";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const resp = await registerUser(req.body);

    const token = jwt.sign({ id: resp.user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.cookie("peace_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    const { password, ...userData } = resp.user.toObject();

    res.status(201).json({
      message: "User created successfully",
      data: { ...userData, token },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const resp = await loginUser(email, password);

    const token = jwt.sign({ id: resp.user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.cookie("peace_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    const { password: _, ...userData } = resp.user.toObject();

    res.status(200).json({
      message: "Login successful",
      data: { ...userData, token },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const logout = (req: Request, res: Response) => {
  res.clearCookie("peace_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logout successful" });
}


export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};