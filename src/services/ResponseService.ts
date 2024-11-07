// src/services/ResponseService.ts
import { Response as ExpressResponse } from "express";
import { BaseError } from "./ErrorService/BaseError";

export interface Result<T = any> {
  statusCode?: number;
  data?: T | null;
  message?: string;
  error?: string | null;
  headers?: Record<string, string>;
}

export class ResponseService {
  public static success<T>(
    response: ExpressResponse,
    data: T,
    message = "Success",
    statusCode = 200
  ): void {
    response.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data,
    });
  }

  public static error(response: ExpressResponse, error: BaseError): void {
    const { statusCode, message, details } = error;
    response.status(statusCode).json({
      success: false,
      statusCode,
      message,
      details:
        process.env.SHOW_ERROR_DETAILS === "true" ? details : undefined,
    });
  }
}
