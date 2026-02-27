export interface appError extends Error {
  message: string;
  statusCode: number;
}