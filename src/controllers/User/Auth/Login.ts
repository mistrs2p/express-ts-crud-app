import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/schemas/User";
import { ResponseService } from "@/services/ResponseService";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return ResponseService.badRequest(res, "Invalid credentials");
  }

  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" },
  );
  ResponseService.success(res, { token }, "successfully logged in!");
};
