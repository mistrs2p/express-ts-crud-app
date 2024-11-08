import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ResponseService from "@/services/ResponseService";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    ResponseService.unauthorized("Access denied");
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (err) {
    ResponseService.badRequest("Invalid token");
    return;
  }
};

export default authMiddleware;
