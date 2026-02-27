import { z } from 'zod';

export const CreateVisitorDto = z.object({
    username: z.string().min(3),
    phoneNumber: z.string().min(8).max(15),
});

export type CreateVisitorDtoType = z.infer<typeof CreateVisitorDto>;