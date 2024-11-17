import { Request, Response } from "express";
import Product from "@/schemas/Product";
import Ok from "@/services/Response/Ok";
import BadRequest from "@/services/Exception.ts/BadRequest";
import ResponseHandler from "@/services/Response";

export const show = async (req: Request, res: Response): Promise<ResponseHandler> => {
  try {
    const products = await Product.find();
    return new Ok({ products });
  } catch (err) {
    throw new BadRequest("Failed to retrieve products");
  }
};
