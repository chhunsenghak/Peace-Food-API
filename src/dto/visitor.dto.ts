import { z } from 'zod';

export const CreatePatientDto = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    gender: z.string().min(1),
    phoneNumber: z.string().min(8).max(15),
});

export type CreatePatientDtoType = z.infer<typeof CreatePatientDto>;