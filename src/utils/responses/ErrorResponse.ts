import { JsonResponse } from "./JsonResponse";
import { Response as BaseResponse } from "./Response";
import { Response as ExpressResponse } from "express"; 

export class ErrorResponse extends BaseResponse {
  constructor(
    public statusCode: number = 500,
    public body: any = { error: "Internal Server Error" }
  ) {
    super({ statusCode, body });
  }

  toResponse(response: ExpressResponse): void {
    new JsonResponse({
      statusCode: this.statusCode,
      body: this.body,
    }).toResponse(response);
  }
}
