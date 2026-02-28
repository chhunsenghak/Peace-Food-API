import { Schema, model } from "mongoose";
import { StatusQueue } from "../enum/statusVisit";

export interface IQueue {
  visitorId: Schema.Types.ObjectId;
  queueNumber: string;
  position: number;
  visitDate: Date;
  estimatedWaitTime: number; // in minutes
  status: StatusQueue;
}

const queueSchema = new Schema<IQueue>(
  {
    visitorId: {
      type: Schema.Types.ObjectId,
      ref: "Visitor",
      required: true,
    },
    queueNumber: { type: String, required: true },
    position: { type: Number, required: true },
    visitDate: { type: Date, required: true },
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
