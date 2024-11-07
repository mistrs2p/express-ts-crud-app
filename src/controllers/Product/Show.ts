import { Request, Response } from "express";
import Product from "@/schemas/Product";
import { successResponse, errorResponse } from "@/utils/responseFormatter";

export const show = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    return successResponse(res, { products });
  } catch (err) {
    errorResponse(res, { message: "Failed to retrieve products" });
  }
};
