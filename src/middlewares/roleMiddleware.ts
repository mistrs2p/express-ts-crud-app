import { Request, Response, NextFunction } from "express";
import ResponseService from "@/services/ResponseService";

const roleMiddleware = (role: "admin" | "user") => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if ((req as any).user.role !== role) {
      ResponseService.forbidden("Access denied");
      return;
    }
    next();
  };
};

export default roleMiddleware;
