import { request, response } from "express";
import { isAppError } from "../utils/errorGuards";
import { 
  getAllQueues as getAllQueuesService, 
  getQueueById as getQueueByIdService, 
  createQueue as createQueueService, 
  updateQueue as updateQueueService, 
  deleteQueue as deleteQueueService 
} from "../services/queue.service";

export const getQueues = async (_req: typeof request, res: typeof response) => {
  try {
    const queues = await getAllQueuesService();
    res.status(200).json({ message: "Queues retrieved successfully", data: queues });
  } catch (error: unknown) {
    if (isAppError(error)) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getQueueById = async (req: typeof request, res: typeof response) => {
  try {
    const queue = await getQueueByIdService(req.params.id as string);
    res.status(200).json({ message: "Queue retrieved successfully", data: queue });
  } catch (error: unknown) {
    if (isAppError(error)) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createQueue = async (req: typeof request, res: typeof response) => {
  try {
    const queueData = req.body;
    const queue = await createQueueService(queueData);
    res.status(201).json({ message: "Queue created successfully", data: queue });
  } catch (error: unknown) {
    if (isAppError(error)) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateQueue = async (req: typeof request, res: typeof response) => {
  try {
    const queueData = req.body;
    const updatedQueue = await updateQueueService(req.params.id as string, queueData);
    res.status(200).json({ message: "Queue updated successfully", data: updatedQueue });
  } catch (error: unknown) {
    if (isAppError(error)) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteQueue = async (req: typeof request, res: typeof response) => {
  try {
    const deletedQueue = await deleteQueueService(req.params.id as string);
    res.status(200).json({ message: "Queue deleted successfully", data: deletedQueue });
  } catch (error: unknown) {
    if (isAppError(error)) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
};