import { type Response } from "express";

export default class ResponseHandler {
  constructor(private status: number, private data: any) {}
  done(res: Response) {
    res.status(this.status).json(this.data);
  }
}
