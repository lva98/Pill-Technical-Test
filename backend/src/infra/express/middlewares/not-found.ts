import { Response, Request, RequestHandler } from "express";

const NotFound: RequestHandler = (req: Request, res: Response) => {
  res
    .status(404)
    .send({
      message: 'Página não encontrada'
    })
}

export default NotFound
