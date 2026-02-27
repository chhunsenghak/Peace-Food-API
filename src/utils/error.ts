class HttpError extends Error {
  statusCode: number;
  constructor(message : string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message, 400);
  }
}

class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message, 404);
  }
}

class InternalServerError extends HttpError {
  constructor(message: string) {
    super(message, 500);
  }
}

class ConflictError extends HttpError {
  constructor(message: string) {
    super(message, 409);
  }
}


export { HttpError, BadRequestError, NotFoundError, InternalServerError, ConflictError };
