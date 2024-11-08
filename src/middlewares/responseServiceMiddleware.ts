import { Request, Response, NextFunction } from "express";
import ResponseService from "@/services/ResponseService";

const responseServiceMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  ResponseService.setResponse(res);
  next();
};
export default responseServiceMiddleware;
