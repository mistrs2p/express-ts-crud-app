import logger from "@/utils/logger";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { ResponseService } from "@/services/ResponseService";

const dbConnectionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const dbStatus = mongoose.connection.readyState;

  if (dbStatus === 1) {
    logger.info("DB Middleware Connection");
    next();
  } else {
    ResponseService.serviceUnavailable(
      res,
      "Database not connected. Please try again later.",
    );
  }
};

export default dbConnectionMiddleware;
