import { Request, Response } from "express";
import User from "@/schemas/User";
import Forbidden from "@/services/Exception.ts/Forbidden";
import BadRequest from "@/services/Exception.ts/BadRequest";
import Success from "@/services/Response/Ok";
import ResponseHandler from "@/services/Response";

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<ResponseHandler> => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user && user.role === "admin") {
      throw new Forbidden("Cannot delete admin");
    }
    await User.findByIdAndDelete(id);
    return new Success("User deleted successfully");
  } catch (err) {
    throw new BadRequest("Failed to delete user");
  }
};
