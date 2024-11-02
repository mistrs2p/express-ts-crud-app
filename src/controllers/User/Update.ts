import { Request, Response } from "express";
import User, { USER_ROLE_ADMIN, USER_ROLE_USER } from "@/schemas/User";
import { successResponse, errorResponse } from "@/utils/responseFormatter";

export const update = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { username, password, role, ...otherUpdates } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      errorResponse(res, { message: "User not found" }, 404);
      return;
    }

    if (user.role === USER_ROLE_ADMIN && role && role !== USER_ROLE_ADMIN) {
      errorResponse(
        res,
        { message: "Cannot change the role of an admin user" },
        403
      );
    }

    // if (user.role === USER_ROLE_USER && role && role === USER_ROLE_USER) {
    //   errorResponse(res, { message: "User cannot change the role" }, 403);
    // }

    if (password) {
      errorResponse(
        res,
        { message: "Password cannot be updated directly" },
        403
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, role, ...otherUpdates },
      { new: true, runValidators: true }
    ).select("-password");

    successResponse(res, { updatedUser }, 204);
  } catch (err) {
    errorResponse(res, { message: "Failed to update user" });
  }
};
