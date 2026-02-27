import { z } from 'zod';
import { StatusVisit } from '../enum/statusVisit';

export const VisitDto = z.object({
    visitorId: z.string().min(1),
    queueId: z.string().min(1),
    status: z.nativeEnum(StatusVisit)
});