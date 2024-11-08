import { IUser } from "@/schemas/User";
import jwt from "jsonwebtoken";

export const generateJWTToken = (user: Omit<IUser, "password">) => {
  return jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );
};
