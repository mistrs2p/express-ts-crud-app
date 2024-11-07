// import { Request, Response, NextFunction } from "express";
// import logger from "@/utils/logger";
// import { errorResponse } from "@/utils/responseFormatter";
// import { ErrorResponse } from "@/utils/responses/ErrorResponse";

// export const errorHandler = (
//   err: Error,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   logger.error(`Error: ${err.message}`);
//   // return errorResponse(res, { message: err.message }, 500);
//   new ErrorResponse(500, { message: err.message })
// };


// src/middlewares/errorHandlerMiddleware.ts
import { NextFunction, Request, Response } from "express";
import { BaseError } from "@/services/ErrorService/BaseError";
import { ResponseService } from "@/services/ResponseService";

export function errorHandlerMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const isOperational = err instanceof BaseError && err.isOperational;

  if (!isOperational) {
    console.error("Unexpected Error:", err); // Log critical error details
    err = new BaseError(); // Replace with a generic internal server error if the error is not operational
  }

  ResponseService.error(res, err as BaseError);
}