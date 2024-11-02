import { Request, Response } from "express";
import User from "@/schemas/User";
import { successResponse, errorResponse } from "@/utils/responseFormatter";

export const show = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    return successResponse(res, { users });
  } catch (err) {
    errorResponse(res, { message: "Failed to retrieve users" });
  }
};
