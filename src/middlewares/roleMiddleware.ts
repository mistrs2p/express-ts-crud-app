import { Request, Response, NextFunction } from "express";
import Forbidden from "@/services/Exception.ts/Forbidden";

const roleMiddleware = (role: "admin" | "user") => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if ((req as any).user.role !== role) {
      throw new Forbidden("Access denied");
    }
    next();
  };
};

export default roleMiddleware;
