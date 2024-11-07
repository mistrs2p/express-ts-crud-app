export class BaseError extends Error {
  constructor(
    public statusCode: number = 500,
    public message: string = "An unexpected error occurred",
    public isOperational: boolean = true,
    public details?: any
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype); // Restore prototype chain
    Error.captureStackTrace(this);
  }
}
