import { Response as ExpressResponse } from "express";
import { BaseError } from "@/services/ErrorService/BaseError";

export interface Result<T = any> {
  statusCode?: number;
  data?: T | null;
  message?: string;
  error?: string | null;
  headers?: Record<string, string>;
}

export class ResponseService<T = any> {
  private static instance: ResponseService;
  private response: ExpressResponse | null = null;

  private constructor() {}

  static getInstance(): ResponseService {
    if (!ResponseService.instance) {
      ResponseService.instance = new ResponseService();
    }
    return ResponseService.instance;
  }

  setResponse(res: ExpressResponse): void {
    this.response = res;
  }

  /**
   * Send a success response
   * @param data Data to send in response body
   * @param message Optional success message
   * @param statusCode HTTP status code (default is 200)
   */
  public success(data: T, message = "Success", statusCode = 200): void {
    if (!this.response) {
      console.error("Response object is not set.");
      return;
    }
    this.response.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data,
    });
  }

  /**
   * Send a "200 OK" success response
   */
  public ok(data: T, message = "Request succeeded"): void {
    this.success(data, message, 200);
  }

  /**
   * Send a "201 Created" success response
   */
  public created(data: T, message = "Resource created successfully"): void {
    this.success(data, message, 201);
  }

  /**
   * Send a "202 Accepted" success response
   */
  public accepted(data: T, message = "Request accepted for processing"): void {
    this.success(data, message, 202);
  }

  /**
   * Send a "204 No Content" success response
   */
  public noContent(data?: T, message = "No content"): void {
    this.success(data as T, message, 204);
  }

  /**
   * Send an error response
   * @param error Error object, instance of BaseError
   */
  public error(error: BaseError): void {
    if (!this.response) {
      console.error("Response object is not set.");
      return;
    }
    const { statusCode, message, details, logLevel = "error" } = error;

    if (logLevel === "error" || logLevel === "critical") {
      console.error(
        `[${logLevel.toUpperCase()} ${statusCode}] ${message}`,
        details
      );
    } else {
      console.log(
        `[${logLevel.toUpperCase()} ${statusCode}] ${message}`,
        details
      );
    }

    this.response.status(statusCode).json({
      success: false,
      statusCode,
      message,
      details: process.env.SHOW_ERROR_DETAILS === "true" ? details : undefined,
    });
  }

  /**
   * Send a "bad request" response
   */
  public badRequest(message = "Bad Request", details?: any): void {
    this.error(new BaseError(400, message, true, details, "ERR_BAD_REQUEST"));
  }

  /**
   * Send an "unauthorized" response
   */
  public unauthorized(message = "Unauthorized"): void {
    this.error(
      new BaseError(401, message, true, undefined, "ERR_UNAUTHORIZED")
    );
  }

  /**
   * Send a "forbidden" response
   */
  public forbidden(message = "Forbidden"): void {
    this.error(new BaseError(403, message, true, undefined, "ERR_FORBIDDEN"));
  }

  /**
   * Send a "not found" response
   */
  public notFound(message = "Resource Not Found"): void {
    this.error(new BaseError(404, message, true, undefined, "ERR_NOT_FOUND"));
  }

  /**
   * Send an "internal server error" response
   */
  public internalServerError(details?: any): void {
    this.error(
      new BaseError(
        500,
        "Internal Server Error",
        false,
        details,
        "ERR_INTERNAL_SERVER"
      )
    );
  }

  /**
   * Send a "503 Service Unavailable" response
   */
  public serviceUnavailable(
    message = "Service Unavailable",
    details?: any
  ): void {
    this.error(
      new BaseError(503, message, false, details, "ERR_SERVICE_UNAVAILABLE")
    );
  }

  /**
   * Send a response with custom headers
   */
  public withHeaders(
    data: T,
    message = "Success",
    statusCode = 200,
    headers: Record<string, string> = {}
  ): void {

    if (!this.response) {
      console.error("Response object is not set.");
      return;
    }
    
    Object.entries(headers).forEach(([key, value]) => {
      this.response!.setHeader(key, value);
    });

    this.response.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data,
    });
  }
}

export default ResponseService.getInstance();