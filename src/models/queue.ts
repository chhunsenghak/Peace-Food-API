import { Schema, model } from "mongoose";
import { StatusQueue } from "../enum/statusVisit";

export interface IQueue {
  serviceId: string;
  visitorId: string;
  position: number;
  estimatedWaitTime: number; // in minutes
  status: StatusQueue;
}

const queueSchema = new Schema<IQueue>(
  {
    serviceId: { type: String, required: true },
    visitorId: { type: String, required: true },
    position: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(StatusQueue),
      default: StatusQueue.WAITING,
    },
    estimatedWaitTime: { type: Number, required: true },
  },
  { timestamps: true },
);

export const Queue = model<IQueue>("Queue", queueSchema);
