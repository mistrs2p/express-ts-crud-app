import { BaseError } from "./BaseError";

export class ForbiddenError extends BaseError {
  constructor(message = "Access forbidden") {
    super(403, message, true);
  }
}
