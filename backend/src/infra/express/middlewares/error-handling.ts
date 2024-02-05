import { ErrorRequestHandler, NextFunction, Response, Request } from "express";
import AppError from "../../../errors/app-error";
import ErrorsType from "../../../errors/errors-type";

const ErrorHandling: ErrorRequestHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  if (err instanceof AppError) {
    return res
      .status(err.status)
      .send(err.toJson())
  }

  return res
    .status(500)
    .send({
      id: 'INTERNAL_SERVER_ERROR',
      type: ErrorsType.NOT_KNOWN,
      status: 500,
      message: 'Erro interno no servidor',
    })
}

export default ErrorHandling
