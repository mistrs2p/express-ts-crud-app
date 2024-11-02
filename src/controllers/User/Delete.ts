import { Request, Response } from "express";
import User from "@/schemas/User";
import { successResponse, errorResponse } from "@/utils/responseFormatter";

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user && user.role === "admin") {
      errorResponse(res, { message: "Cannot delete admin" }, 403);
      return;
    }
    await User.findByIdAndDelete(id);
    successResponse(res, { message: "User deleted successfully" });
  } catch (err) {
    errorResponse(res, { message: "Failed to delete user" });
  }
};
