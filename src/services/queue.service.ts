import mongoose from "mongoose";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../utils/error";
import { QueueDAO } from "../dao/queue.dao";
import { IQueue } from "../models/queue";
import { isAppError } from "../utils/errorGuards";
import {
  emitQueueCreated,
  emitQueueDeleted,
  emitQueueUpdated,
} from "../realtime/socket";

export const createQueue = async (queueData: IQueue) => {
  try {
    const queue = await QueueDAO.create(queueData);
    emitQueueCreated(queue);
    return queue;
  } catch (error: unknown) {
    if (isAppError(error)) {
      throw error;
    }
    // eslint-disable-next-line no-console
    console.error("Unexpected error in createQueue:", error);
    throw new InternalServerError("INTERNAL_SERVER_ERROR");
  }
};

export const getQueueById = async (id: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("INVALID_QUEUE_ID");
    }
    const queue = await QueueDAO.findById(id);
    if (!queue) {
      throw new NotFoundError("QUEUE_NOT_FOUND");
    }
    return queue;
  } catch (error: unknown) {
    if (isAppError(error)) {
      throw error;
    }
    // eslint-disable-next-line no-console
    console.error("Unexpected error in getQueueById:", error);
    throw new InternalServerError("INTERNAL_SERVER_ERROR");
  }
};

export const getAllQueues = async () => {
  try {
    const queues = await QueueDAO.findAll();
    return queues;
  } catch (error: unknown) {
    if (isAppError(error)) {
      throw error;
    }
    // eslint-disable-next-line no-console
    console.error("Unexpected error in getAllQueues:", error);
    throw new InternalServerError("INTERNAL_SERVER_ERROR");
  }
};

export const updateQueue = async (id: string, queueData: Partial<IQueue>) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("INVALID_QUEUE_ID");
    }
    const queue = await QueueDAO.findById(id);
    if (!queue) {
      throw new NotFoundError("QUEUE_NOT_FOUND");
    }
    const updatedQueue = await QueueDAO.update(id, queueData);
    if (updatedQueue) {
      emitQueueUpdated(updatedQueue);
    }
    return updatedQueue;
  } catch (error: unknown) {
    if (isAppError(error)) {
      throw error;
    }
    // eslint-disable-next-line no-console
    console.error("Unexpected error in updateQueue:", error);
    throw new InternalServerError("INTERNAL_SERVER_ERROR");
  }
};

export const deleteQueue = async (id: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("INVALID_QUEUE_ID");
    }
    const queue = await QueueDAO.findById(id);
    if (!queue) {
      throw new NotFoundError("QUEUE_NOT_FOUND");
    }
    await QueueDAO.delete(id);
    emitQueueDeleted(queue);
    return queue;
  } catch (error: unknown) {
    if (isAppError(error)) {
      throw error;
    }
    // eslint-disable-next-line no-console
    console.error("Unexpected error in deleteQueue:", error);
    throw new InternalServerError("INTERNAL_SERVER_ERROR");
  }
};
