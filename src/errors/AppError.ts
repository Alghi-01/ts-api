class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    _message: string,
    _statusCode: number = 500,
    _isOperational: boolean = true
  ) {
    super(_message);
    this.statusCode = _statusCode;
    this.isOperational = _isOperational;
  }
}

export default AppError;
