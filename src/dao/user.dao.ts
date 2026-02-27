import { User, IUser } from "../models/user";

export class UserDAO {
  static async findByEmail(email: string) {
    return User.findOne({ email });
  }

  static async findById(id: string) {
    return User.findById(id).select("-password");
  }

  static async create(userData: IUser) {
    return User.create(userData);
  }

  static async findAll() {
    return User.find().select("-password");
  }

  static async update(id: string, userData: Partial<IUser>) {
    return User.findByIdAndUpdate(id, userData, {
      new: true,
      runValidators: true,
    }).select("-password");
  }

  static async delete(id: string) {
    return User.findByIdAndDelete(id);
  }
}
