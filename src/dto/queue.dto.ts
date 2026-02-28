import { z } from "zod";
import { StatusQueue } from "../enum/statusVisit";

export const CreateQueueDto = z.object({
  visitorId: z.string().min(1),
  queueNumber: z.string().min(4).max(10),
  position: z.string().min(1),
  visitDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  estimatedWaitTime: z.number().int().positive(),
  status: z.nativeEnum(StatusQueue),
});

export const UpdateQueueDto = z.object({
  position: z.string().min(1).optional(),
  estimatedWaitTime: z.number().int().positive().optional(),
  status: z.nativeEnum(StatusQueue).optional(),
});

export type CreateQueueDtoType = z.infer<typeof CreateQueueDto>;
export type UpdateQueueDtoType = z.infer<typeof UpdateQueueDto>;