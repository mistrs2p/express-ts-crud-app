import { Request, Response } from "express";
import Product from "@/schemas/Product";
import { addData } from "@/utils/addData";
import Ok from "@/services/Response/Ok";
import BadRequest from "@/services/Exception.ts/BadRequest";
import ResponseHandler from "@/services/Response";

export const add = async (req: Request, res: Response): Promise<ResponseHandler> => {
  try {
    const add = await addData();
    const data = await Product.find();
    return new Ok({ data });
  } catch (err) {
    throw new BadRequest("Failed to retrieve products");
  }
};
