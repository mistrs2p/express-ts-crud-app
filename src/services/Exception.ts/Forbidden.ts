import Exception from ".";

export default class BadRequest extends Exception {
  constructor(message: string, data?: any) {
    super(403, message, data);
  }
}
