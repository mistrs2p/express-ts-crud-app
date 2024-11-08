import { Request, Response } from "express";
import User from "@/schemas/User";
import ResponseService from "@/services/ResponseService";

export const show = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    ResponseService.ok({ users });
  } catch (err) {
    ResponseService.badRequest("Failed to retrieve users");
  }
};
