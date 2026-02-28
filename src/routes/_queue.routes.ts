import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate";
import { CreateQueueDto, UpdateQueueDto } from "../dto/queue.dto";
import {
  getQueues,
  createQueue,
  getQueueById,
  updateQueue,
  deleteQueue,
} from "../controllers/queue.controller";

const router = Router();

/**
 * @swagger
 * /api/queues:
 *   get:
 *     summary: Get all queues
 *     tags: [Queues]
 *     responses:
 *       200:
 *         description: List of queues
 *       500:
 *         description: Internal server error
 */

router.get("/queues", authMiddleware, getQueues);

/**
 * @swagger
 * /api/queues:
 *   post:
 *     summary: Create a new queue
 *     tags: [Queues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - visitorId
 *               - queueNumber
 *               - position
 *               - visitDate
 *               - estimatedWaitTime
 *               - status
 *             properties:
 *               visitorId:
 *                 type: string
 *               queueNumber:
 *                 type: number
 *               position:
 *                 type: number
 *               visitDate:
 *                 type: string
 *                 format: date-time
 *               estimatedWaitTime:
 *                 type: number
 *               status:
 *                 type: string
 *     responses:  
 *       201:
 *         description: Queue created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/queues", authMiddleware, validate(CreateQueueDto), createQueue);


/** 
 * @swagger
 * /api/queues/{id}:
 *   get:
 *     summary: Get a queue by ID
 *     tags: [Queues]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the queue
 *     responses:
 *       200:
 *         description: Queue found
 *       404:
 *         description: Queue not found
 *       500:
 *         description: Internal server error
 */
router.get("/queues/:id", authMiddleware, getQueueById);


/** 
 * @swagger
 * /api/queues/{id}:
 *   patch: 
 *     summary: Update a queue by ID
 *     tags: [Queues]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          description: The ID of the queue
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               position:
 *                 type: string
 *               estimatedWaitTime:
 *                 type: number
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Queue updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Queue not found
 *       500:
 *         description: Internal server error
 */
router.patch("/queues/:id", authMiddleware, validate(UpdateQueueDto), updateQueue);

/**
 * @swagger
 * /api/queues/{id}:
 *   delete:
 *     summary: Delete a queue by ID
 *     tags: [Queues]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the queue
 *     responses:
 *       200:
 *         description: Queue deleted successfully
 *       404:
 *         description: Queue not found
 *       500:
 *         description: Internal server error
 */
router.delete("/queues/:id", authMiddleware, deleteQueue);

export default router;
