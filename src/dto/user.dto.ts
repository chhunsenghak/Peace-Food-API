import { z } from 'zod';

export const CreateUserDto = z.object({
    email: z.string().email(),
    username: z.string().min(3),
    password: z.string().min(6)
});

export const UpdateUserDto = z.object({
    username: z.string().min(3).optional(),
    password: z.string().min(6).optional()
});

export const LoginUserDto = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

export type CreateUserDtoType = z.infer<typeof CreateUserDto>;
export type UpdateUserDtoType = z.infer<typeof UpdateUserDto>;
export type LoginUserDtoType = z.infer<typeof LoginUserDto>;