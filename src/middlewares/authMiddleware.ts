import { errorResponse } from "@/utils/responseFormatter";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    errorResponse(res, { message: "Access denied" }, 401);
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (err) {
    errorResponse(res, { message: "Invalid token" }, 400);
    return;
  }
};

export default authMiddleware;
