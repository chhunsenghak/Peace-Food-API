import { Secret, SignOptions } from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
const expiresIn = (process.env.JWT_EXPIRES_IN ?? "1d") as SignOptions["expiresIn"];

if (!secret) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const JWT_SECRET: Secret = secret;
export const JWT_EXPIRES_IN: SignOptions["expiresIn"] = expiresIn;

export const jwtOptions: SignOptions = {
  expiresIn: JWT_EXPIRES_IN,
};