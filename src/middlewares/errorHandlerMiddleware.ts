import { NextFunction, Request, Response } from "express";
import { BaseError } from "@/services/ErrorService/BaseError";
import { ResponseService } from "@/services/ResponseService";

export function errorHandlerMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const isOperational = err instanceof BaseError && err.isOperational;

  if (!isOperational) {
    console.error("Unexpected Error:", err);

    err = new BaseError(
      500,
      "An unexpected error occurred. Please try again later.",
      false,
      undefined,
      "ERR_INTERNAL_SERVER",
      "critical",
    );
  }

  ResponseService.error(res, err as BaseError);
}
