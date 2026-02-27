import { IUser } from "../models/user";
import { UserDAO } from "../dao/user.dao";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import {
  BadRequestError,
  ConflictError,
  InternalServerError,
  NotFoundError,
} from "../utils/error";
import { isAppError } from "../utils/errorGuards";

function isMongoDuplicateKeyError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: unknown }).code === 11000
  );
}

function stripUndefined<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined),
  ) as Partial<T>;
}

export const getAllUsers = async () => {
  try {
    const users = await UserDAO.findAll();
    if (!users) {
      throw new NotFoundError("USERS_NOT_FOUND");
    }
    return users;
  } catch (error: unknown) {
    if (isAppError(error)) throw error;
    throw new InternalServerError("INTERNAL_SERVER_ERROR");
  }
};

export const getUserById = async (id: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("INVALID_USER_ID");
    }
    const user = await UserDAO.findById(id);
    if (!user) {
      throw new NotFoundError("USER_NOT_FOUND");
    }
    return user;
  } catch (error: unknown) {
    if (isAppError(error)) throw error;
    throw new InternalServerError("INTERNAL_SERVER_ERROR");
  }
};

export const updateUser = async (id: string, userData: Partial<IUser>) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("INVALID_USER_ID");
    }

    const updateDoc = stripUndefined(userData);
    if (Object.keys(updateDoc).length === 0) {
      throw new BadRequestError("NO_UPDATE_FIELDS");
    }

    if (updateDoc.password) {
      updateDoc.password = await bcrypt.hash(updateDoc.password, 10);
    }

    const user = await UserDAO.update(id, updateDoc);
    if (!user) {
      throw new NotFoundError("USER_NOT_FOUND");
    }
    return user;
  } catch (error: unknown) {
    if (isAppError(error)) throw error;
    if (isMongoDuplicateKeyError(error)) {
      throw new ConflictError("EMAIL_ALREADY_EXISTS");
    }
    throw new InternalServerError("INTERNAL_SERVER_ERROR");
  }
};

export const deleteUser = async (id: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("INVALID_USER_ID");
    }
    const user = await UserDAO.delete(id);
    if (!user) {
      throw new NotFoundError("USER_NOT_FOUND");
    }
    return user;
  } catch (error: unknown) {
    if (isAppError(error)) throw error;
    throw new InternalServerError("INTERNAL_SERVER_ERROR");
  }
};