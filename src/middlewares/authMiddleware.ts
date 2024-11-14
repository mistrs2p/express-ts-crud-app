import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ResponseService from "@/services/ResponseService";
import UnAuthorized from "@/services/Exception.ts/UnAuthorized";
import BadRequest from "@/services/Exception.ts/BadRequest";
import ResponseHandler from "@/services/Response";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new UnAuthorized("Access denied");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (err) {
    throw new BadRequest("Invalid token");
  }
};

export default authMiddleware;
