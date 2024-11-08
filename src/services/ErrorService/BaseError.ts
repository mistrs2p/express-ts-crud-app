export class BaseError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: any;
  public readonly errorCode?: string;
  public readonly logLevel: "info" | "warn" | "error" | "critical";

  /**
   * BaseError constructor
   * @param statusCode HTTP status code for the error (e.g., 404, 500)
   * @param message Error message for client visibility
   * @param isOperational Indicates if the error is due to operational issues (e.g., validation or authorization)
   * @param details Optional: Additional details for debugging (e.g., validation errors)
   * @param errorCode Optional: Application-specific error code (e.g., "ERR_USER_NOT_FOUND")
   * @param logLevel Optional: Logging level for monitoring tools ("info", "warn", "error", "critical")
   */
  constructor(
    statusCode: number = 500,
    message: string = "An unexpected error occurred",
    isOperational: boolean = true,
    details?: any,
    errorCode?: string,
    logLevel: "info" | "warn" | "error" | "critical" = "error",
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype); // Restore prototype chain
    Error.captureStackTrace(this);

    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;
    this.errorCode = errorCode;
    this.logLevel = logLevel;

    // Setting the name of the error to the class name for easier identification
    this.name = this.constructor.name;
  }
}
