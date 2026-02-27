import { appError } from "../types/error";

export function isAppError(error: unknown): error is appError {
    return error instanceof Error && 'statusCode' in error;
}