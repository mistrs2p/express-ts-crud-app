import { NextFunction, type Request, type Response } from "express";
import type ResponseHandler from "@/services/Response";

export default function handler(
  fn: (req: Request, res: Response) => Promise<ResponseHandler>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res)
      .then((data) => data.done(res))
      .catch((err) => next(err));
  };
}
