import { Schema, model } from "mongoose";

export interface IVisitor {
  username: string;
  phoneNumber: string;
}

const visitorSchema = new Schema<IVisitor>(
  {
    username: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  { timestamps: true },
);

export const Visitor = model<IVisitor>("Visitor", visitorSchema);
