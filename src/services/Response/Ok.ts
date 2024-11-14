import ResponseHandler from ".";

export default class Success extends ResponseHandler {
  constructor(data: any) {
    super(200, data);
  }
}
