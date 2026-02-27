import { z } from 'zod';

export const CreateQueueDto = z.object({
    visitorId: z.string().min(1),
    position: z.number().int().positive(),
    estimatedWaitTime: z.number().int().positive(),
    status: z.enum(["waiting", "served", "skipped"])
});

export const UpdateQueueDto = z.object({
    position: z.number().int().positive().optional(),
    estimatedWaitTime: z.number().int().positive().optional(),
    status: z.enum(["waiting", "served", "skipped"]).optional()
});

export type CreateQueueDtoType = z.infer<typeof CreateQueueDto>;
export type UpdateQueueDtoType = z.infer<typeof UpdateQueueDto>;