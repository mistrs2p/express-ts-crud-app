import { Response as ExpressResponse } from "express";

export interface Result<T = any> {
  statusCode?: number;
  data?: T | null;
  message?: string;
  error?: string | null;
  headers?: Record<string, string>;
}

export class BaseResponse<T = any> {
  protected statusCode: number;
  protected data: T | null;
  protected message: string;
  protected error: string | null;
  protected headers: Record<string, string>;

  constructor({
    statusCode = 200,
    data = null,
    message = "Success",
    error = null,
    headers = {},
  }: Result<T> = {}) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.error = error;
    this.headers = headers;
  }

  public toResponse(response: ExpressResponse): void {
    Object.entries(this.headers).forEach(([key, value]) => {
      response.setHeader(key, value);
    });
    response.status(this.statusCode).json({
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
      error: this.error,
    });
  }
}

export class JsonResponse<T = any> extends BaseResponse<T> {
  constructor(result: Result<T> = {}) {
    super({
      ...result,
      headers: { "Content-Type": "application/json", ...result.headers },
    });
  }

  public static ok<T>(data: T, message = "Success"): JsonResponse<T> {
    return new JsonResponse<T>({ statusCode: 200, data, message });
  }

  public static created<T>(
    data: T,
    message = "Resource created"
  ): JsonResponse<T> {
    return new JsonResponse<T>({ statusCode: 201, data, message });
  }

  public static badRequest(error: string): JsonResponse<null> {
    return new JsonResponse<null>({ statusCode: 400, error });
  }

  public static notFound(error = "Resource not found"): JsonResponse<null> {
    return new JsonResponse<null>({ statusCode: 404, error });
  }

  public static internalServerError(
    error = "Internal Server Error"
  ): JsonResponse<null> {
    return new JsonResponse<null>({ statusCode: 500, error });
  }
}

export class ErrorResponse extends Error {
  constructor(
    public statusCode: number = 500,
    public message: string = "Internal Server Error",
    public details?: any
  ) {
    super(message);
  }

  public toResponse(response: ExpressResponse): void {
    console.error(`[Error] ${this.statusCode}: ${this.message}`, this.details); 
    new JsonResponse({
      statusCode: this.statusCode,
      error: this.message,
      data: this.details,
    }).toResponse(response);
  }
}
