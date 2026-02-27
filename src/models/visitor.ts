import { Schema, model } from "mongoose";

export interface IVisitor {
  id: string;
  username: string;
  phoneNumber: string;
}

const visitorSchema = new Schema<IVisitor>(
  {
    id: { type: String, required: true },
    username: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  { timestamps: true },
);

export const Visitor = model<IVisitor>("Visitor", visitorSchema);
