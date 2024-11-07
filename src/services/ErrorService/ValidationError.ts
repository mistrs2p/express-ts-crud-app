import { BaseError } from "./BaseError";

export class ValidationError extends BaseError {
  constructor(details: any) {
    super(400, "Validation error", true, details);
  }
}
