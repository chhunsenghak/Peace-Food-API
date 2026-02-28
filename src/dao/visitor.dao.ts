import { Visitor, IVisitor } from "../models/visitor";

export class VisitorDAO {
  static async create(visitorData: IVisitor): Promise<IVisitor> {
    const visitor = new Visitor(visitorData);
    await visitor.save();
    return visitor;
  }

  static async findByPhoneNumber(
    phoneNumber: string,
  ): Promise<IVisitor | null> {
    return Visitor.findOne({ phoneNumber });
  }

  static async findById(id: string): Promise<IVisitor | null> {
    return Visitor.findById(id);
  }

  static async findAll(): Promise<IVisitor[]> {
    return Visitor.find();
  }

  static async deleteVisitor(id: string): Promise<IVisitor | null> {
    return Visitor.findByIdAndDelete(id);
  }
}
