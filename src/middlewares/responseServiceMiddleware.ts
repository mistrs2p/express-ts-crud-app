import { Request, Response, NextFunction } from "express";
import ResponseService from "@/services/ResponseService";

export const responseServiceMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  ResponseService.setResponse(res);
  next();
};
