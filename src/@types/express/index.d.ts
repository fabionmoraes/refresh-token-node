interface IError {
  statusCode: string
  message: string
}

declare namespace Express {
  export interface Request {
    user_id: string
  }
}
