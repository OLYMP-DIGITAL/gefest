export enum ResponseErrorName {
  application = 'ApplicationError',
  validation = 'ValidationError',
  forbidden = 'ForbiddenError',
}

export interface ErrorResponse {
  data: null;
  error: {
    status: number;
    name: ResponseErrorName;
    message: string;
    details: {};
  };
}
