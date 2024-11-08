import { Request, Response, NextFunction } from "express";

const jsonMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.setHeader("Content-Type", "application/json");
  next();
};

export default jsonMiddleware;
