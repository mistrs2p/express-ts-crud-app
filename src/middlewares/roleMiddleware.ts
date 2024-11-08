import { ResponseService } from "@/services/ResponseService";
import { Request, Response, NextFunction } from "express";

const roleMiddleware = (role: "admin" | "user") => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if ((req as any).user.role !== role) {
      ResponseService.forbidden(res, "Access denied");
      return;
    }
    next();
  };
};

export default roleMiddleware;
