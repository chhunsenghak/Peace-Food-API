import { Schema, model } from "mongoose";
import { StatusVisit } from "../enum/statusVisit";

export interface IVisit {
  id: string;
  visitorId: string;
  serviceId: string;
  visitDate: Date;
  status: StatusVisit;
}

const visitSchema = new Schema<IVisit>(
  {
    id: { type: String, required: true },
    visitorId: { type: String, required: true },
    serviceId: { type: String, required: true },
    visitDate: { type: Date, required: true },
    status: {
      type: String,
      enum: Object.values(StatusVisit),
      default: StatusVisit.WAITING,
    },
  },
  { timestamps: true },
);

export const Visit = model<IVisit>("Visit", visitSchema);
