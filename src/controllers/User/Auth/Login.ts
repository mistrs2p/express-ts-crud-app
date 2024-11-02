import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/schemas/User";
import { successResponse, errorResponse } from "@/utils/responseFormatter";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return errorResponse(res, { message: "Invalid credentials"})
  }

  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );
  return successResponse(res, { token, message: "successfully logged in!" });
};
