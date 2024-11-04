import logger from "@/utils/logger";
import { errorResponse } from "@/utils/responseFormatter";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const dbConnectionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dbStatus = mongoose.connection.readyState;

  if (dbStatus === 1) {
    logger.info("DB Middleware Connection");
    next();
  } else {
    errorResponse(
      res,
      { message: "Database not connected. Please try again later." },
      503
    );
  }
};

export default dbConnectionMiddleware;
