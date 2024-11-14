import { Request, Response } from "express";
import User from "@/schemas/User";
import Success from "@/services/Response/Ok";
import BadRequest from "@/services/Exception.ts/BadRequest";
import ResponseHandler from "@/services/Response";

export const show = async (
  req: Request,
  res: Response
): Promise<ResponseHandler> => {
  try {
    const users = await User.find().select("-password");
    return new Success({ users });
  } catch (err) {
    throw new BadRequest("Failed to retrieve users");
  }
};
