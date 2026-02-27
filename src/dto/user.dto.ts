import { z } from 'zod';
import { UserRole } from '../enum/userRole';

export const CreateUserDto = z.object({
    email: z.string().email(),
    username: z.string().min(3),
    password: z.string().min(6),
    phoneNumber: z.string().min(8).optional()
});

export const UpdateUserDto = z.object({
    email: z.string().email().optional(),
    username: z.string().min(3).optional(),
    password: z.string().min(6).optional(),
    phoneNumber: z.string().min(8).optional(),
    role: z.nativeEnum(UserRole).optional(),
});

export const LoginUserDto = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

export type CreateUserDtoType = z.infer<typeof CreateUserDto>;
export type UpdateUserDtoType = z.infer<typeof UpdateUserDto>;
export type LoginUserDtoType = z.infer<typeof LoginUserDto>;