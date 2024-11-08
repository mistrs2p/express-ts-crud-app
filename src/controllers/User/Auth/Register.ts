import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "@/schemas/User";
import { ResponseService } from "@/services/ResponseService";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });

    await newUser.save();
    ResponseService.created(res, "User created successfully");
  } catch (err) {
    ResponseService.badRequest(res, "Failed to create user");
  }
};
