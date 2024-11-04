import { Response as ExpressResponse } from "express";

export interface Result {
  body?: any;
  statusCode?: number;
  headers?: Record<string, string>;
}

interface Responsable {
  toResponse: (response: ExpressResponse) => void;
}

export class Response implements Responsable {
  readonly body: Result["body"];
  readonly statusCode: Result["statusCode"];
  readonly headers: Result["headers"];

  constructor(result?: Result) {
    this.statusCode = result?.statusCode || 200;
    this.headers = result?.headers || {}; // Ensure headers is always an object
    this.body = result?.body ?? null;
  }

  toResponse(response: ExpressResponse): void {
    // Make sure this.headers is an object
    const headers = this.headers || {};

    Object.entries(headers).forEach(([key, value]) => {
      if (value !== undefined) {
        response.set(key, value);
      }
    });

    response.status(this.statusCode!).send(this.body);
  }
}