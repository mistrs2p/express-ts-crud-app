import ResponseHandler from "../Response";

export default class Exception extends Error {
  constructor(
    protected statusCode: number,
    public message: string,
    protected data?: any
  ) {
    super(message);
  }
  done() {
    return new ResponseHandler(this.statusCode, {
      message: this.message,
      ...this.data,
    });
  }
}
