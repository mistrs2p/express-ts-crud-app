import { BaseError } from "./BaseError";

export class AuthenticationError extends BaseError {
  constructor(message = "Authentication error") {
    super(401, message, true);
  }
}
