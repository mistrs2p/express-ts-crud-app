import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "@/schemas/User";
import { successResponse, errorResponse } from "@/utils/responseFormatter";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });

    await newUser.save();
    successResponse(res, { message: "User created successfully" }, 201);
  } catch (err) {
    errorResponse(res, { message: "Failed to create user" });
  }
};
