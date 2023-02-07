export class AppError {
  public readonly statusCode: number

  public readonly error: string

  public readonly message: string

  constructor(statusCode: number, error: string, message: string) {
    this.statusCode = statusCode
    this.error = error
    this.message = message
  }
}
