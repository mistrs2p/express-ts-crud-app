import Exception from ".";

export default class BadRequest extends Exception {
  constructor(message: string, data?: any) {
    super(503, message = "Service unavailable", data);
  }
}
