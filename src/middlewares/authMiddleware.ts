import { ResponseService } from "@/services/ResponseService";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    ResponseService.unauthorized(res, "Access denied");
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (err) {
    ResponseService.badRequest(res, "Invalid token");
    return;
  }
};

export default authMiddleware;
