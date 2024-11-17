import logger from "@/utils/logger";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import ServiceUnavailable from "@/services/Exception.ts/ServiceUnavailable";

const dbConnectionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const dbStatus = mongoose.connection.readyState;

  if (dbStatus === 1) {
    logger.info("DB Middleware Connection");
    next();
  } else {
    throw new ServiceUnavailable(
      "Database not connected. Please try again later."
    );
  }
};

export default dbConnectionMiddleware;
