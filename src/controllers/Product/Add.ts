import { Request, Response } from "express";
import Product from "@/schemas/Product";
import { successResponse, errorResponse } from "@/utils/responseFormatter";
import { addData } from "@/utils/addData";

export const add = async (req: Request, res: Response) => {
  try {
    const add = await addData();
    console.log(add);
    const data = await Product.find();
    return successResponse(res, { data });
  } catch (err) {
    errorResponse(res, { message: "Failed to retrieve products" });
  }
};
