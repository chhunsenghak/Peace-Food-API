import { Router } from "express";
import { validate } from "../middleware/validate";
import { authMiddleware } from "../middleware/auth.middleware";
import { CreateVisitorDto } from "../dto/visitor.dto";
import {
  createVisitor,
  getVisitors,
  getVisitorById,
  getVisitorByPhoneNumber,
  deleteVisitor,
} from "../controllers/visitor.controller";
const router = Router();

/**
 * @swagger
 * /api/visitors:
 *   get:
 *     summary: Get all visitors
 *     tags: [Visitors]
 *     responses:
 *       200:
 *         description: List of visitors
 *       500:
 *         description: Internal server error
 */
router.get("/visitors", authMiddleware, getVisitors);

/**
 * @swagger
 * /api/visitors/{id}:
 *   get:
 *     summary: Get a visitor by ID
 *     tags: [Visitors]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *     responses:
 *       200:
 *         description: Visitor found successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Visitor not found
 *       500:
 *         description: Internal server error
 */
router.get("/visitors/:id", authMiddleware, getVisitorById);

/**
 * @swagger
 * /api/visitors/phone/{phoneNumber}:
 *   get:
 *     summary: Get a visitor by phone number
 *     tags: [Visitors]
 *     parameters:
 *      - in: path
 *        name: phoneNumber
 *        required: true
 *     responses:
 *       200:
 *         description: Visitor found successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Visitor not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/visitors/phone/:phoneNumber",
  authMiddleware,
  getVisitorByPhoneNumber,
);

/**
 * @swagger
 * /api/visitors:
 *   post:
 *     summary: Create a new visitor
 *     tags: [Visitors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "0934567890"
 *     responses:
 *       200:
 *         description: Visitor created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post(
  "/visitors",
  authMiddleware,
  validate(CreateVisitorDto),
  createVisitor,
);

/**
 * @swagger
 * /api/visitors/{id}:
 *   delete:
 *     summary: Delete a visitor by ID
 *     tags: [Visitors]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *     responses:
 *       200:
 *         description: Visitor deleted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Visitor not found
 *       500:
 *         description: Internal server error
 */
router.delete("/visitors/:id", authMiddleware, deleteVisitor);

export default router;
