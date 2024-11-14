import { Request, Response } from "express";
import User, { USER_ROLE_ADMIN, USER_ROLE_USER } from "@/schemas/User";
import Forbidden from "@/services/Exception.ts/Forbidden";
import NotFound from "@/services/Exception.ts/NotFound";
import NoContent from "@/services/Response/NoContent";
import BadRequest from "@/services/Exception.ts/BadRequest";
import ResponseHandler from "@/services/Response";

export const update = async (
  req: Request,
  res: Response
): Promise<ResponseHandler> => {
  const { id } = req.params;
  const { username, password, role, ...otherUpdates } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      throw new NotFound("User not found");
    }

    if (role && user.role === USER_ROLE_ADMIN && role !== USER_ROLE_ADMIN) {
      new Forbidden("Normal user cannot change the role of an admin user");
    }

    // if (user.role === USER_ROLE_USER && role && role === USER_ROLE_USER) {
    //   errorResponse( { message: "User cannot change the role" }, 403);
    // }

    if (password) {
      new Forbidden("Password cannot be updated directly");
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, role, ...otherUpdates },
      { new: true, runValidators: true }
    ).select("-password");

    return new NoContent({ updatedUser });
  } catch (err) {
    throw new BadRequest("Failed to update user");
  }
};
