import { errorResponse } from "@/utils/responseFormatter";
import { Request, Response, NextFunction } from "express";

const roleMiddleware = (role: "admin" | "user") => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if ((req as any).user.role !== role) {
      errorResponse(res, { message: "Access denied" }, 403);
      return;
    }
    next();
  };
};

export default roleMiddleware;
