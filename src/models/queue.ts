import { Schema, model } from "mongoose";

export interface IQueue {
  id: string;
  serviceId: string;
  visitorId: string;
  position: number;
  estimatedWaitTime: number; // in minutes
  status: "waiting" | "served" | "skipped";
}

const queueSchema = new Schema<IQueue>(
  {
    id: { type: String, required: true },
    serviceId: { type: String, required: true },
    visitorId: { type: String, required: true },
    position: { type: Number, required: true },
    status: {
      type: String,
      enum: ["waiting", "served", "skipped"],
      default: "waiting",
    },
    estimatedWaitTime: { type: Number, required: true },
  },
  { timestamps: true },
);

export const Queue = model<IQueue>("Queue", queueSchema);
