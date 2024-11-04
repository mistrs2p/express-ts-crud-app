import { Response, Result } from "./Response";

export class JsonResponse extends Response {
  constructor(result: Result) {
    const body = result.body !== undefined ? JSON.stringify(result.body) : null;
    const headers = {
      ...result.headers,
      "content-type": "application/json",
    };
    super({ ...result, body, headers });
  }
}
