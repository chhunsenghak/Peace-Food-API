import { Schema, model } from "mongoose";

export interface IVisitor {
  phoneNumber: string;
}

const visitorSchema = new Schema<IVisitor>(
  {
    phoneNumber: { type: String, required: true },
  },
  { timestamps: true },
);

export const Visitor = model<IVisitor>("Visitor", visitorSchema);
