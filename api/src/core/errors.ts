export class NotFoundError extends Error {
  readonly status = 404
  constructor(message = 'Not found') {
    super(message)
  }
}

export class ValidationError extends Error {
  readonly status = 400
  constructor(message = 'Validation error') {
    super(message)
  }
}
