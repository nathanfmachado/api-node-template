export enum StatusCode {
  Success = 200,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  AlreadyExists = 409,
  ServerError = 500,
  ServiceUnavailable = 503,
}

export enum ErrorType {
  DataSourceError = StatusCode.ServerError,
  ForbiddenError = StatusCode.Forbidden,
  InvalidDataError = StatusCode.BadRequest,
  NotFoundError = StatusCode.NotFound,
  AlreadyExists = StatusCode.AlreadyExists,
  ServerError = StatusCode.ServerError,
  UnauthorizedError = StatusCode.Unauthorized,
  ServiceUnavailableError = StatusCode.ServiceUnavailable,
}
