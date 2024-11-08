import { Response as ExpressResponse } from "express";
import { BaseError } from "@/services/ErrorService/BaseError";

export interface Result<T = any> {
  statusCode?: number;
  data?: T | null;
  message?: string;
  error?: string | null;
  headers?: Record<string, string>;
}

export class ResponseService {
  /**
   * Send a success response
   * @param response Express response object
   * @param data Data to send in response body
   * @param message Optional success message
   * @param statusCode HTTP status code (default is 200)
   */
  public static success<T>(
    response: ExpressResponse,
    data: T,
    message = "Success",
    statusCode = 200,
  ): void {
    response.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data,
    });
  }

  /**
   * Send a "200 OK" success response
   */
  public static ok<T>(
    response: ExpressResponse,
    data: T,
    message = "Request succeeded",
  ): void {
    this.success(response, data, message, 200);
  }

  /**
   * Send a "201 Created" success response
   */
  public static created<T>(
    response: ExpressResponse,
    data: T,
    message = "Resource created successfully",
  ): void {
    this.success(response, data, message, 201);
  }

  /**
   * Send a "202 Accepted" success response
   */
  public static accepted<T>(
    response: ExpressResponse,
    data: T,
    message = "Request accepted for processing",
  ): void {
    this.success(response, data, message, 202);
  }

  /**
   * Send a "204 No Content" success response
   */
  public static noContent<T>(
    response: ExpressResponse,
    data?: T,
    message = "No content",
  ): void {
    this.success(response, data, message, 204);
  }

  /**
   * Send an error response
   * @param response Express response object
   * @param error Error object, instance of BaseError
   */
  public static error(response: ExpressResponse, error: BaseError): void {
    const { statusCode, message, details, logLevel = "error" } = error;

    if (logLevel === "error" || logLevel === "critical") {
      console.error(
        `[${logLevel.toUpperCase()} ${statusCode}] ${message}`,
        details,
      );
    } else {
      console.log(
        `[${logLevel.toUpperCase()} ${statusCode}] ${message}`,
        details,
      );
    }

    response.status(statusCode).json({
      success: false,
      statusCode,
      message,
      details: process.env.SHOW_ERROR_DETAILS === "true" ? details : undefined,
    });
  }

  /**
   * Send a "bad request" response
   */
  public static badRequest(
    response: ExpressResponse,
    message = "Bad Request",
    details?: any,
  ): void {
    this.error(
      response,
      new BaseError(400, message, true, details, "ERR_BAD_REQUEST"),
    );
  }

  /**
   * Send an "unauthorized" response
   */
  public static unauthorized(
    response: ExpressResponse,
    message = "Unauthorized",
  ): void {
    this.error(
      response,
      new BaseError(401, message, true, undefined, "ERR_UNAUTHORIZED"),
    );
  }

  /**
   * Send a "forbidden" response
   */
  public static forbidden(
    response: ExpressResponse,
    message = "Forbidden",
  ): void {
    this.error(
      response,
      new BaseError(403, message, true, undefined, "ERR_FORBIDDEN"),
    );
  }

  /**
   * Send a "not found" response
   */
  public static notFound(
    response: ExpressResponse,
    message = "Resource Not Found",
  ): void {
    this.error(
      response,
      new BaseError(404, message, true, undefined, "ERR_NOT_FOUND"),
    );
  }

  /**
   * Send an "internal server error" response
   */
  public static internalServerError(
    response: ExpressResponse,
    details?: any,
  ): void {
    this.error(
      response,
      new BaseError(
        500,
        "Internal Server Error",
        false,
        details,
        "ERR_INTERNAL_SERVER",
      ),
    );
  }

  /**
   * Send a "503 Service Unavailable" response
   */
  public static serviceUnavailable(
    response: ExpressResponse,
    message = "Service Unavailable",
    details?: any,
  ): void {
    this.error(
      response,
      new BaseError(503, message, false, details, "ERR_SERVICE_UNAVAILABLE"),
    );
  }

  /**
   * Send a response with custom headers
   */
  public static withHeaders<T>(
    response: ExpressResponse,
    data: T,
    message = "Success",
    statusCode = 200,
    headers: Record<string, string> = {},
  ): void {
    Object.entries(headers).forEach(([key, value]) => {
      response.setHeader(key, value);
    });

    response.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data,
    });
  }
}
