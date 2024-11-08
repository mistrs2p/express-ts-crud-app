import { Request, Response } from "express";
import User, { USER_ROLE_ADMIN, USER_ROLE_USER } from "@/schemas/User";
import { successResponse, errorResponse } from "@/utils/responseFormatter";
import { ResponseService } from "@/services/ResponseService";

export const update = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { username, password, role, ...otherUpdates } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      ResponseService.notFound(res, "User not found");
      return;
    }

    if (role && user.role === USER_ROLE_ADMIN &&  role !== USER_ROLE_ADMIN) {
      ResponseService.forbidden(res, "Normal user cannot change the role of an admin user");
    }

    // if (user.role === USER_ROLE_USER && role && role === USER_ROLE_USER) {
    //   errorResponse(res, { message: "User cannot change the role" }, 403);
    // }

    if (password) {
      ResponseService.forbidden(res, "Password cannot be updated directly");
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, role, ...otherUpdates },
      { new: true, runValidators: true },
    ).select("-password");

    ResponseService.noContent(res, { updatedUser });
  } catch (err) {
    ResponseService.badRequest(res, "Failed to update user");
  }
};
