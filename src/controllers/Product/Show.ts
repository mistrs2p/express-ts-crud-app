import { Request, Response } from "express";
import Product from "@/schemas/Product";
import ResponseService from "@/services/ResponseService";

export const show = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    ResponseService.success({ products });
  } catch (err) {
    ResponseService.badRequest("Failed to retrieve products");
  }
};
