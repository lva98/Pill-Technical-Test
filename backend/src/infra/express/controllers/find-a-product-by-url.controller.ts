import { RequestHandler, Request, Response, NextFunction } from "express";
import FindAProductByUrl from "../../../domain/use-cases/find-a-product-by-url";
import ProductSequelizeRepository from "../../repositories/product-sequelize-repository";
import ProductScrapingRepository from "../../repositories/product-scraping-repository";

const FindAProductByUrlController: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const findAproductByUrl = new FindAProductByUrl(
    new ProductSequelizeRepository(),
    new ProductScrapingRepository()
  )

  const url = req.query.url as string
  const product = await findAproductByUrl.execute(url)
  return res.status(200).send(product)
}

export default FindAProductByUrlController
