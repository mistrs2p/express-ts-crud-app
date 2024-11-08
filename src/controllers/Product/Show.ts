import { Request, Response } from "express";
import Product from "@/schemas/Product";
import { successResponse, errorResponse } from "@/utils/responseFormatter";
import { ResponseService } from "@/services/ResponseService";

export const show = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    ResponseService.success(res, { products });
  } catch (err) {
    ResponseService.badRequest(res, "Failed to retrieve products");
  }
};
