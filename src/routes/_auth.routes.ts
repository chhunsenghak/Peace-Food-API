import { Router } from "express";
import { validate } from "../middleware/validate";
import { authMiddleware } from "../middleware/auth.middleware";
import { CreateUserDto, LoginUserDto } from "../dto/user.dto";
import {
  getProfile,
  login,
  logout,
  register,
} from "../controllers/auth.controller";

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Create a new user account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 */
router.post("/register", validate(CreateUserDto), register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/login", validate(LoginUserDto), login);

/**
 * @swagger
 * /api/auth/logout:
 *  post:
 *    summary: Logout a user
 *    tags: [Auth]
 *    responses:
 *      200:
 *        description: Logout successful
 *      500:
 *        description: Internal server error
 */
router.post("/logout", authMiddleware, logout);

/**
 * @swagger
 * /api/auth/profile:
 *  get:
 *    summary: Get the profile of the currently authenticated user
 *    tags: [Auth]
 *    responses:
 *      200:
 *        description: Profile retrieved successfully
 *      401:
 *        description: Unauthorized
 */
router.get("/profile", authMiddleware, getProfile);

export default router;
