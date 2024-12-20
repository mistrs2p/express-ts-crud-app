import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "@/schemas/User";
import jwt from "jsonwebtoken";
import BadRequest from "@/services/Exception.ts/BadRequest";
import Created from "@/services/Response/Created";
import ResponseHandler from "@/services/Response";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      throw new BadRequest("Username already exists", username);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username, role: newUser.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    // Set the token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Set to true in production
      sameSite: "strict", // Ensures cookie is only sent with same-site requests
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    return new Created("User created successfully");
  } catch (err) {
    throw new BadRequest("Failed to create user", err);
  }
};
