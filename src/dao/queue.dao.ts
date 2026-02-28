import { IQueue, Queue } from "../models/queue";

export class QueueDAO {
  static async create(queueData: IQueue): Promise<IQueue> {
    const queue = new Queue(queueData);
    await queue.save();
    return queue;
  }

  static async findById(id: string): Promise<IQueue | null> {
    return Queue.findById(id);
  }

  static async findAll(): Promise<IQueue[]> {
    return Queue.find();
  }

  static async update(id: string, queueData: Partial<IQueue>): Promise<IQueue | null> {
    return Queue.findByIdAndUpdate(id, queueData, { new: true });
  }

  static async delete(id: string): Promise<IQueue | null> {
    return Queue.findByIdAndDelete(id);
  }
}
