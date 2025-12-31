export class ConfigValidationError extends Error {
  override message: string;
  public validatorError: Error;
  constructor(message: string, validatorError: Error) {
    super(message);
    this.message = message;
    this.validatorError = validatorError;
  }
}
