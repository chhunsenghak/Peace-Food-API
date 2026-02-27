import { Schema, model } from "mongoose";

export interface IVisit {
  id: string;
  visitorId: string;
  serviceId: string;
  visitDate: Date;
  status: "waiting" | "served" | "completed" | "skipped";
}

const visitSchema = new Schema<IVisit>(
  {
    id: { type: String, required: true },
    visitorId: { type: String, required: true },
    serviceId: { type: String, required: true },
    visitDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["waiting", "served", "completed", "skipped"],
      default: "waiting",
    },
  },
  { timestamps: true },
);

export const Visit = model<IVisit>("Visit", visitSchema);
