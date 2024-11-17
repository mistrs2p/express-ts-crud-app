import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/schemas/User";
import ResponseHandler from "@/services/Response";
import Success from "@/services/Response/Ok";
import BadRequest from "@/services/Exception.ts/BadRequest";

export const login = async (
  req: Request,
  res: Response
): Promise<ResponseHandler> => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    new BadRequest("Invalid credentials");
  }

  const token = jwt.sign(
    { _id: user!._id, role: user!.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );
  return new Success({ token, message: "successfully logged in!" });
};
