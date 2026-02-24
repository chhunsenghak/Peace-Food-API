import { z } from 'zod';

export const CreateUserDto = z.object({
    email: z.string().email(),
    username: z.string().min(3),
    password: z.string().min(6),
    role: z.enum(["student", "instructor", "admin"]).default("student"),
});

export type CreateUserDtoType = z.infer<typeof CreateUserDto>;