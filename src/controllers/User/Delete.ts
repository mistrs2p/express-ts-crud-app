import { Request, Response } from "express";
import User from "@/schemas/User";
import ResponseService from "@/services/ResponseService";

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user && user.role === "admin") {
      ResponseService.forbidden("Cannot delete admin");
    }
    await User.findByIdAndDelete(id);
    ResponseService.success("User deleted successfully");
  } catch (err) {
    ResponseService.badRequest("Failed to delete user");
  }
};
