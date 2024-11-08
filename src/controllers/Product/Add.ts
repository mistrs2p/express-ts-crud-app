import { Request, Response } from "express";
import Product from "@/schemas/Product";
import { addData } from "@/utils/addData";
import { ResponseService } from "@/services/ResponseService";

export const add = async (req: Request, res: Response) => {
  try {
    const add = await addData();
    const data = await Product.find();
    ResponseService.success(res, { data });
  } catch (err) {
    ResponseService.badRequest(res, "Failed to retrieve products");
  }
};
